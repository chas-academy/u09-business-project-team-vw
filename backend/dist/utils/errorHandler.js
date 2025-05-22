"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = handleError;
// Collect Error messages and show them in the terminal for the developer
function handleError(error, context) {
    const message = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : null;
    console.error(`\nERROR${context ? ` in ${context}` : ''}`);
    console.error(`Message: ${message}`);
    if (stack)
        console.error(`Stack trace:\n${stack}`);
}
