
// Collect Error messages and show them in the terminal for the developer
export function handleError(error: unknown, context: string): void {
  const message = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error ? error.stack : null;

  console.error(`\nERROR${context ? ` in ${context}` : ''}`);
  console.error(`Message: ${message}`);

  if (stack) console.error(`Stack trace:\n${stack}`);
}
