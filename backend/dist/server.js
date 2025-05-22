"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandler_1 = require("./utils/errorHandler");
dotenv_1.default.config(); // Load .env file
const app = (0, express_1.default)(); // Define app as Application object
// PORT 
// Fetch PORT from .env file.
const rawPort = process.env.PORT;
const PORT = rawPort ? parseInt(rawPort, 10) : 3000;
// Checks PORT is valid
if (isNaN(PORT)) {
    const error = new Error('PORT number is not valid');
    (0, errorHandler_1.handleError)(error, 'server.ts - Row 15/20');
    process.exit(1);
}
// MONGODB_URI
// Check if URI exist, if not, exit.
if (!process.env.MONGODB_URI) {
    const error = new Error('MONGODB_URI does not exist i root file');
    (0, errorHandler_1.handleError)(error, 'server.ts - Row 22/28');
    process.exit(1);
}
// ensure URI is a string.
const MONGODB_URI = process.env.MONGODB_URI;
// MAKE THE CONNETION
app.use(express_1.default.json());
mongoose_1.default.connect(MONGODB_URI)
    .then(() => {
    console.log('MongoDB connected successfully!');
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });
})
    .catch(error => {
    (0, errorHandler_1.handleError)(error, 'MongoDB Connection');
});
