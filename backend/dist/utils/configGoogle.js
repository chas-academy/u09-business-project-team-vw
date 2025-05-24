"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GOOGLE_CLIENT_URL = exports.GOOGLE_CLIENT_SECRET = exports.GOOGLE_CLIENT_ID = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandler_1 = require("./errorHandler");
dotenv_1.default.config();
// Google Auth from .env and define type as string.
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
exports.GOOGLE_CLIENT_ID = GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
exports.GOOGLE_CLIENT_SECRET = GOOGLE_CLIENT_SECRET;
const GOOGLE_CLIENT_URL = process.env.GOOGLE_CLIENT_URL;
exports.GOOGLE_CLIENT_URL = GOOGLE_CLIENT_URL;
// Ensure no variable is missing
if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_CLIENT_URL) {
    const error = new Error('Google Auth is missing a credential');
    (0, errorHandler_1.handleError)(error, 'configGoogle.ts');
    process.exit(1);
}
