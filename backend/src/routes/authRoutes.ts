import { Router, Response, Request } from 'express';
import passport from 'passport';
import { isAuthenticated } from '../middleware/isAuthenticated'; // <-- Middleware
import { successResponse } from '../utils/response';

const authRouter: Router = Router()

// Google Auth login
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: true }),
    (req: Request, res: Response) => {
        res.redirect('/me');
    }
);

export default authRouter;