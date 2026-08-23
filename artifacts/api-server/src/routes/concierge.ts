import { Router, type IRouter } from "express";
import OpenAI from "openai";

const router: IRouter = Router();

const ORG_CONTEXT = `You are the SBI Concierge, the friendly assistant for SBI Network (Student Business Initiative Network).

ABOUT: SBI Network is a student-run nonprofit network of local chapters that provide FREE digital services to small businesses in their community. Students gain real-world marketing, AI, and business skills; local businesses get professional digital help at no cost.

SERVICES chapters provide (free within a chapter's approved service area):
- Professional websites (built by a student "Coder" using AI tools — no coding experience required)
- Promotional videos
- Branding, flyers, social media setup, and Google Business Profile optimization (approved extras)

CHAPTERS: The first chapter is East Brunswick SBI (EBSBI) in New Jersey, serving roughly a 5-mile radius. A chapter can start with as few as 2 students; the Chapter Leader keeps work and communication on track. Before client work goes live it must pass the network's baseline quality review by Quality Leads.

HOW TO GET INVOLVED:
- Students who want to start or join a chapter: visit the Chapter page on this site and complete the Chapter Leader application (Google Form). After review, there's a short conversation with the founder.
- Business owners who want free services: visit the Business page or email ebsbi.official@gmail.com
- Contact: ebsbi.official@gmail.com | (201) 988-9390

PEOPLE: Founder Da'El Kim, Co-Founder James Yu.

RULES:
- Only answer questions about SBI Network, its mission, programs, chapters, services, and how to get involved. If asked about anything else, gently redirect to SBI topics.
- Never fabricate names, dates, statistics, or details not listed above. If you don't know, say so and point to ebsbi.official@gmail.com.
- Keep answers short: 1-3 sentences, max ~80 words. Plain text only, no markdown.`;

const MAX_HISTORY = 6;
const MAX_INPUT_CHARS = 400;
const MAX_REQUESTS_PER_WINDOW = 12;
const REQUEST_WINDOW_MS = 60 * 60 * 1000;
const requestBudget = new Map<string, { count: number; resetAt: number }>();

router.post("/openai/conversations/:id/messages", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders?.();

  try {
    const forwardedFor = req.headers["x-forwarded-for"];
    const clientKey =
      (typeof forwardedFor === "string" ? forwardedFor.split(",")[0] : undefined) ??
      req.socket.remoteAddress ??
      "unknown";
    const now = Date.now();
    const current = requestBudget.get(clientKey);
    const budget =
      !current || current.resetAt <= now
        ? { count: 0, resetAt: now + REQUEST_WINDOW_MS }
        : current;
    if (budget.count >= MAX_REQUESTS_PER_WINDOW) {
      res.write(`data: ${JSON.stringify({ error: "This Concierge session is temporarily capped. Please try again later or email ebsbi.official@gmail.com." })}\n\n`);
      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
      return;
    }
    budget.count += 1;
    requestBudget.set(clientKey, budget);

    const content = String(req.body?.content ?? "").slice(0, MAX_INPUT_CHARS).trim();
    if (!content) {
      res.write(`data: ${JSON.stringify({ error: "Empty message." })}\n\n`);
      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
      return;
    }

    const rawHistory = Array.isArray(req.body?.history) ? req.body.history : [];
    const history = rawHistory
      .slice(-MAX_HISTORY)
      .filter(
        (m: { role?: string; content?: string }) =>
          (m?.role === "user" || m?.role === "assistant") &&
          typeof m?.content === "string",
      )
      .map((m: { role: "user" | "assistant"; content: string }) => ({
        role: m.role,
        content: m.content.slice(0, MAX_INPUT_CHARS),
      }));

    const openai = new OpenAI({
      apiKey: process.env["AI_INTEGRATIONS_OPENAI_API_KEY"],
      baseURL: process.env["AI_INTEGRATIONS_OPENAI_BASE_URL"],
    });

    const stream = await openai.chat.completions.create({
      model: "gpt-5-nano",
      max_completion_tokens: 300,
      messages: [
        { role: "system", content: ORG_CONTEXT },
        ...history,
        { role: "user", content },
      ],
      stream: true,
    });

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content;
      if (delta) {
        res.write(`data: ${JSON.stringify({ content: delta })}\n\n`);
      }
    }
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch {
    res.write(
      `data: ${JSON.stringify({ error: "Sorry, something went wrong. Please try again." })}\n\n`,
    );
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  }
});

export default router;
