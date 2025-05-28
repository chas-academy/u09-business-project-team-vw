import { Router, Response, Request } from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import { successResponse, errorResponse } from '../utils/response';
import { SessionData } from 'express-session';


// Type to remove session data
type CustomSession = SessionData & {
    userId?: string;
    destroy: (callback: (err?: unknown) => void) => void;
};

const userRouter: Router = Router();

userRouter.get('/me', isAuthenticated, (req: Request, res: Response) => {
        res.status(200).json(successResponse('User found!', req.user ?? null));
});

userRouter.get('/logout', isAuthenticated, (req: Request, res: Response) => {
    req.session.destroy((error) => {
        if (error) {
            res.status(500).json(errorResponse('Logout failed', error));
            return;
        }

        res.clearCookie('connect.sid');
        res.status(200).json(successResponse('Logout successful!', null));
        return;
    });
});

export default userRouter;