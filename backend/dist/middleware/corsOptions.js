"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const allowedOrigins = ['http://localhost:3000'];
exports.corsOptions = {
    origin: allowedOrigins,
    credentials: true,
};
