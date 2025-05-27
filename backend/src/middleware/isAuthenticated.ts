import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/response';
import { UserData } from '../interfaces/User/UserData';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if(req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }
    res.status(401).json(errorResponse('Unauthorized', null));
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as UserData;
    if(user?.isAdmin) {
        return next();
    }

    res.status(403).json(errorResponse('Access denied', null));
    return;
};