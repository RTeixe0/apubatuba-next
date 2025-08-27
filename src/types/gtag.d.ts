// src/types/gtag.d.ts

/** Config extra aceita pelo gtag('config', ...) */
interface GtagConfig {
  page_path?: string;
  anonymize_ip?: boolean;
  // Campos adicionais permitidos
  [key: string]: unknown;
}

/** Parâmetros de evento GA4 */
interface GtagEventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  // Campos extras (ex.: link_url, is_whatsapp, etc.)
  [key: string]: unknown;
}

/** Assinaturas suportadas pelo gtag */
interface GtagFn {
  (command: "js", date: Date): void;
  (command: "config", measurementId: string, config?: GtagConfig): void;
  (command: "event", action: string, params?: GtagEventParams): void;
  (
    command: "consent",
    subcommand: "update",
    params: Record<string, "granted" | "denied">
  ): void;
}

declare global {
  interface Window {
    dataLayer?: unknown[]; // <- unknown[], não any[]
    gtag?: GtagFn; // <- função com overloads
  }
}
