import { Router, Response, Request } from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import { successResponse, errorResponse } from '../utils/response';

const userRouter: Router = Router();

userRouter.get('/me', isAuthenticated, (req: Request, res: Response) => {
        res.status(200).json(successResponse('User found!', req.user ?? null))
});

userRouter.get('/logout', isAuthenticated, (req: Request, res: Response) => {
    const session = req.session as any;

    // Throw error if logout is failed
    req.logout((err) => {
        if (err) {
            res.status(500).json(errorResponse('Logout failed', null));
            return;
        }
            
        // Clear the session and clear cookies
        session.destroy(() => {
            res.clearCookie('connect.sid');
            res.status(200).json(successResponse('Logout Succesful!', null))
        })
    });
});

export default userRouter;