"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_KEY = exports.MONGODB_URI = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandler_1 = require("./errorHandler");
dotenv_1.default.config();
const API_KEY = process.env.API_KEY;
exports.API_KEY = API_KEY;
// EXTERNAL API error handler.
if (!process.env.API_KEY) {
    const error = new Error('API_KEY is missing or invalid');
    (0, errorHandler_1.handleError)(error, 'config.ts');
    process.exit(1);
}
// PORT 
// Fetch PORT from .env file.
const rawPort = process.env.PORT;
const PORT = rawPort ? parseInt(rawPort, 10) : 3000;
exports.PORT = PORT;
// Check if PORT is exist and defined
if (isNaN(PORT)) {
    const error = new Error('FAILED - PORT number is not valid or missing');
    (0, errorHandler_1.handleError)(error, 'config.ts');
    process.exit(1);
}
// MONGODB_URI
// Check if URI exist, if not, exit.
if (!process.env.MONGODB_URI) {
    const error = new Error('MONGODB_URI does not exist i root file');
    (0, errorHandler_1.handleError)(error, 'config.ts');
    process.exit(1);
}
// ensure URI is a string.
const MONGODB_URI = process.env.MONGODB_URI;
exports.MONGODB_URI = MONGODB_URI;
