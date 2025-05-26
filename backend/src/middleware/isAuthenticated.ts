import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/response';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if(req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }
    res.status(401).json(errorResponse('Unauthorized', null));
};