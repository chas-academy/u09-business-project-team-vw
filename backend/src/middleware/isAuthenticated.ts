import { Request, Response, NextFunction } from 'express';
import { JwtUserPayload } from '../interfaces/User/JwtUserPayload';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
    const isAuth = (req as any).isAuthenticated?.();

    if(isAuth) {
        return next();
    }

    res.status(401).json({ message: 'Unauthorized, please login to access this page.' });
};

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
    const isAdmin = (req as any).isAdmin?.();

    if(isAdmin) {
        return next();
    }

    res.status(401).json({ message: 'Unauthorized, you need Admin access to view this page' });
}