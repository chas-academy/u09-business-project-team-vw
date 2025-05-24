"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const isAuthenticated = (req, res, next) => {
    const isAuth = req.isAuthenticated?.();
    if (isAuth) {
        return next();
    }
    res.status(401).json({ message: 'Unauthorized, please login to access this page.' });
};
exports.isAuthenticated = isAuthenticated;
