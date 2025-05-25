import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
    const isAuth = (req as any).isAuthenticated?.();

    if(isAuth) {
        return next();
    }

    res.status(401).json({ message: 'Unauthorized, please login to access this page.' });
};