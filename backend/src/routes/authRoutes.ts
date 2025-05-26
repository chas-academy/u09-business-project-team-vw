import { Router, Response, Request } from 'express';
import passport from 'passport';
import { errorResponse, successResponse } from '../utils/response';

const authRouter: Router = Router()

// Google Auth login
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


// Checking user for login and store session data.
authRouter.get('/google/callback', passport.authenticate('google', { session: true, failureMessage: true }),
    (req: Request, res: Response) => {
        if(!req.user) {
            const session = req.session as { messages?: string[] };
            const message = session?.messages?.[0] || 'Authentication failed';
            const error = new Error(message);
            
            res.status(401).json(errorResponse(message, error));
            return;
        }

        const user = req.user;

        res.status(200).json(successResponse('Login Succesful!', user));
    }
);

export default authRouter;