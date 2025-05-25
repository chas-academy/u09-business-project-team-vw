"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// FUNDAMENTALS
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
// CORS
const cors_1 = __importDefault(require("cors"));
const corsOptions_1 = require("./middleware/corsOptions");
// UTILS
const config_1 = require("./utils/config");
const errorHandler_1 = require("./utils/errorHandler");
// ROUTES
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
// AUTH
const googleAuth_1 = require("./auth/googleAuth");
// Load googleauth file
(0, googleAuth_1.setupGoogleStrategy)();
// Define app as Application object
const app = (0, express_1.default)();
// Check CORS access for user
app.use((0, cors_1.default)(corsOptions_1.corsOptions));
// MAKE THE CONNECTION
app.use(express_1.default.json());
app.use('/auth', authRoutes_1.default);
// Use PORT and MONGODB_URI to connect to the database
mongoose_1.default.connect(config_1.MONGODB_URI)
    .then(() => {
    console.log('SUCCESS: MongoDB Connected');
    app.listen(config_1.PORT, () => {
        console.log(`SUCCESS: Server is Running on port: ${config_1.PORT}`);
    });
})
    .catch((error) => {
    (0, errorHandler_1.handleError)(error, 'MongoDB Connection');
});
