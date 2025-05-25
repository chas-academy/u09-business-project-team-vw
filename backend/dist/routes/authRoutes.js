"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const isAuthenticated_1 = require("../middleware/isAuthenticated"); // <-- Middleware
const authRouter = (0, express_1.Router)();
// Google Auth login
authRouter.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/login', session: true }), (req, res) => {
    res.redirect('/success');
});
// Middleware
authRouter.get('/me', isAuthenticated_1.isAuthenticated, (req, res) => {
    res.json(req.user);
});
authRouter.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err)
            return res.status(500).json({ message: 'logout failed', error: err });
        res.redirect('/');
    });
});
exports.default = authRouter;
