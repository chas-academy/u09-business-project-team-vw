import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth/AuthenticatedRequest';

export type AuthHandler = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => void;