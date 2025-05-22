"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultHeaderRecipe = exports.apiKey = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandler_1 = require("./errorHandler");
dotenv_1.default.config();
// EXTERNAL API
if (!process.env.API_KEY) {
    const error = new Error('API_KEY is missing or invalid');
    (0, errorHandler_1.handleError)(error, 'apiKey.ts - Row 7/11');
    process.exit(1);
}
const apiKey = process.env.API_KEY; // assigned the key to the variable apiKey.
exports.apiKey = apiKey;
// Use this defaultHeader when fetching from API
exports.defaultHeaderRecipe = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json',
    'authorization': `Bearer ${apiKey}`
};
