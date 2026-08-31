export interface LogContext { [key: string]: unknown }

/** Structured logs keep provider choice open (Vercel, Datadog, OTEL collector). */
export function logInfo(event: string, context: LogContext = {}) {
  console.info(JSON.stringify({ level: "info", event, at: new Date().toISOString(), ...context }));
}
export function logError(event: string, error: unknown, context: LogContext = {}) {
  console.error(JSON.stringify({ level: "error", event, at: new Date().toISOString(), error: error instanceof Error ? error.message : String(error), ...context }));
}
