// global.d.ts
export {}; // deixa este arquivo como módulo para o TS

/** Config aceita em gtag('config', ...) */
interface GtagConfig {
  page_path?: string;
  anonymize_ip?: boolean;
  [key: string]: unknown;
}

/** Parâmetros de evento GA4 */
interface GtagEventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: unknown;
}

/** Overloads do gtag */
interface GtagFn {
  (command: "js", date: Date): void;
  (command: "config", measurementId: string, config?: GtagConfig): void;
  (command: "event", action: string, params?: GtagEventParams): void;
  (command: "consent", subcommand: "update", params: Record<string, "granted" | "denied">): void;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}
