// src/lib/gtag.ts
export const GA_ID = "G-DX787P6VLW";

const isBrowser = typeof window !== "undefined";

export const hasGA = (): boolean =>
  isBrowser && typeof window.gtag === "function";

/** Pageview em mudanças de rota */
export const pageview = (url: string): void => {
  if (!hasGA()) return;
  window.gtag!("config", GA_ID, { page_path: url });
};

/** Eventos customizados */
export const event = (
  name: string,
  params: Record<string, unknown> = {}
): void => {
  if (!hasGA()) return;
  window.gtag!("event", name, params);
};

// ------------- Helpers de classificação -------------

export const isExternalUrl = (href: string): boolean => {
  try {
    const base = isBrowser ? window.location.origin : "http://localhost";
    const url = new URL(href, base);
    return !isBrowser || url.origin !== window.location.origin;
  } catch {
    return false;
  }
};

export const isWhatsApp = (href: string): boolean =>
  /(?:^|\/\/)(?:wa\.me|api\.whatsapp\.com)/i.test(href);

export const isSocial = (href: string): boolean =>
  /(instagram\.com|facebook\.com|linktr\.ee|tiktok\.com|youtube\.com)/i.test(
    href
  );

export const isPhone = (href: string): boolean => /^tel:/i.test(href);
export const isEmail = (href: string): boolean => /^mailto:/i.test(href);

export const isApartmentLink = (href: string): boolean =>
  /^\/[a-z0-9-]+$/i.test(href); // ajuste se tiver outras rotas internas

export const safeText = (el: Element | null): string => {
  if (!el) return "";
  const aria = (el.getAttribute("aria-label") || "").trim();
  if (aria) return aria.slice(0, 80);
  const text = (el.textContent || "").replace(/\s+/g, " ").trim();
  return text.slice(0, 80);
};

export const datasetInfo = (el: Element | null): Record<string, string> => {
  if (!el) return {};
  const section = el.getAttribute("data-gtag-section") || "";
  const label = el.getAttribute("data-gtag-label") || "";
  const out: Record<string, string> = {};
  if (section) out.section = section;
  if (label) out.label_override = label;
  return out;
};

function whereInLayout(el: Element): string {
  const maxDepth = 5;
  let cur: Element | null = el;
  for (let i = 0; i < maxDepth && cur; i++) {
    if (cur.id) return cur.id;
    if (cur.classList.contains("header") || cur.tagName === "HEADER")
      return "header";
    if (cur.classList.contains("footer") || cur.tagName === "FOOTER")
      return "footer";
    if (cur.classList.contains("hero")) return "hero";
    if (cur.classList.contains("gallery")) return "gallery";
    if (cur.classList.contains("details")) return "details";
    if (cur.classList.contains("nav")) return "nav";
    cur = cur.parentElement;
  }
  return "content";
}

// ------------- Trackers principais -------------

export const trackLinkClick = (a: HTMLAnchorElement): void => {
  const href = a.getAttribute("href") || "";
  const text = safeText(a);
  const info = datasetInfo(a);

  const params = {
    link_url: href,
    link_text: text,
    is_external: isExternalUrl(href),
    is_whatsapp: isWhatsApp(href),
    is_social: isSocial(href),
    is_phone: isPhone(href),
    is_email: isEmail(href),
    is_apartment: isApartmentLink(href),
    location: whereInLayout(a),
    ...info,
  };

  event("link_click", params);
};

export const trackButtonClick = (btn: HTMLButtonElement): void => {
  const text = safeText(btn);
  const info = datasetInfo(btn);

  const params = {
    button_text: text,
    button_id: btn.id || undefined,
    location: whereInLayout(btn),
    ...info,
  };

  event("button_click", params);
};
