import { randomUUID } from "node:crypto";
import { Router, type IRouter } from "express";
import { ReplitConnectors } from "@replit/connectors-sdk";
import {
  GetSbiFormStatusResponse,
  SubmitSbiFormBody,
  SubmitSbiFormParams,
  SubmitSbiFormResponse,
} from "@workspace/api-zod";
import { logger } from "../lib/logger";

const router: IRouter = Router();
const recipient = "sbi.official@gmail.com";
const requestWindowMs = 60_000;
const requestLimit = 8;
const recentSubmissions = new Map<string, { start: number; count: number }>();

router.get("/forms/status", (_req, res): void => {
  res.json(GetSbiFormStatusResponse.parse({
    ready: Boolean(process.env.SBI_RESEND_FROM_EMAIL),
  }));
});

router.post("/forms/:kind", async (req, res): Promise<void> => {
  const origin = req.get("origin");
  const host = (req.get("x-forwarded-host") ?? req.get("host") ?? "").split(",")[0].trim();
  const fetchSite = req.get("sec-fetch-site");
  if (fetchSite === "cross-site") {
    res.status(403).json({ error: "Submit the form from the SBI website." });
    return;
  }
  if (origin) {
    try {
      const originUrl = new URL(origin);
      const protocol = (req.get("x-forwarded-proto") ?? req.protocol).split(",")[0].trim().replace(/:$/, "");
      const requestUrl = host ? new URL(`${protocol}://${host}`) : null;
      const sameSiteProxyRequest = fetchSite === "same-origin" || fetchSite === "same-site";
      if ((!requestUrl || originUrl.origin !== requestUrl.origin) && !sameSiteProxyRequest) {
        res.status(403).json({ error: "Submit the form from the SBI website." });
        return;
      }
    } catch {
      res.status(403).json({ error: "Submit the form from the SBI website." });
      return;
    }
  }

  const params = SubmitSbiFormParams.safeParse({ kind: req.params.kind });
  if (!params.success) {
    res.status(400).json({ error: "Choose a valid SBI form." });
    return;
  }

  const parsed = SubmitSbiFormBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Check the form answers and try again." });
    return;
  }

  if (parsed.data.website?.trim()) {
    res.status(202).json(SubmitSbiFormResponse.parse({ message: "Submission accepted." }));
    return;
  }

  const answers = Object.fromEntries(
    Object.entries(parsed.data.answers).map(([label, value]) => [label.trim(), value.trim()]),
  );
  const entries = Object.entries(answers).filter(([, value]) => value.length > 0);
  const answerSize = entries.reduce((size, [label, value]) => size + label.length + value.length, 0);
  if (
    entries.length < 2 ||
    entries.length > 30 ||
    answerSize > 18_000 ||
    entries.some(([label, value]) => !label || label.length > 80 || value.length > 5_000)
  ) {
    res.status(400).json({ error: "Check the form answers and try again." });
    return;
  }

  const email = answers.Email?.trim();
  const name = answers["Full name"]?.trim() ?? answers["Your name"]?.trim();
  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: "Enter your name and a valid email address." });
    return;
  }

  const now = Date.now();
  for (const [key, record] of recentSubmissions) {
    if (now - record.start > requestWindowMs) recentSubmissions.delete(key);
  }
  const requestKey = req.ip || "unknown";
  const requestRecord = recentSubmissions.get(requestKey);
  if (requestRecord && now - requestRecord.start < requestWindowMs) {
    if (requestRecord.count >= requestLimit) {
      res.status(429).json({ error: "Please wait a minute before submitting another form." });
      return;
    }
    requestRecord.count += 1;
  } else {
    recentSubmissions.set(requestKey, { start: now, count: 1 });
  }

  const from = process.env.SBI_RESEND_FROM_EMAIL?.trim();
  if (!from) {
    res.status(503).json({ error: "SBI email delivery is not configured yet. Your answers have not been sent." });
    return;
  }

  const kind = params.data.kind;
  const subject = kind === "application" ? "New SBI chapter application" : "New SBI business request";
  const text = [
    subject,
    "",
    ...entries.flatMap(([label, value]) => [`${label}:`, value, ""]),
    "",
    "Submitted through the SBI Network website.",
  ].join("\n");

  try {
    const connectors = new ReplitConnectors();
    const response = await connectors.proxy("resend", "/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": randomUUID(),
      },
      body: JSON.stringify({
        from: `SBI Network <${from}>`,
        to: recipient,
        reply_to: email,
        subject,
        text,
      }),
    });

    if (!response.ok) {
      logger.error({ providerStatus: response.status, kind }, "SBI form email was rejected by Resend");
      res.status(502).json({ error: "The email service did not accept this form. Please use the existing form link." });
      return;
    }

    res.status(202).json(SubmitSbiFormResponse.parse({
      message: "Your answers were accepted for email delivery to SBI.",
    }));
  } catch (error) {
    logger.error({ kind }, "SBI form email delivery failed");
    res.status(502).json({ error: "We could not send this form. Please use the existing form link." });
  }
});

export default router;
