import type { MouseEvent } from "react";

export function handleSmoothHashClick(event: MouseEvent<HTMLElement>) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  const origin = event.target;
  if (!(origin instanceof Element)) return;

  const anchor = origin.closest<HTMLAnchorElement>('a[href^="#"]');
  if (!anchor) return;

  const id = decodeURIComponent(anchor.hash.slice(1));
  const target = document.getElementById(id);
  if (!target) return;

  event.preventDefault();
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "instant"
    : "smooth";
  target.scrollIntoView({ behavior: behavior as ScrollBehavior, block: "start" });
  window.history.replaceState(window.history.state, "", `#${encodeURIComponent(id)}`);
}
