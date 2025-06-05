import { Router, Response, Request } from 'express';
import passport from 'passport';
import { errorResponse } from '../utils/response';
import { isAuthenticated } from '../middleware/isAuthenticated';

const authRouter: Router = Router();

// Google Auth login
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Checking user for login and store session data.
authRouter.get('/google/callback', passport.authenticate('google', { 
    session: true, 
    failureRedirect: 'https://u09-team-vw.netlify.app/login',
    successRedirect: 'false'
    }),
    (req: Request, res: Response) => {
        if(!req.user) {
            const session = req.session as { messages?: string[] };
            const message = session?.messages?.[0] || 'Authentication failed';
            const error = new Error(message);
            
            res.status(401).json(errorResponse(message, error));
            return;
        }

        req.login(req.user, (error) => {
            if(error) {
                res.status(500).json(errorResponse('Login Session Failed!', error));
                return;
            }

            console.log('DU ÄR HÄR', req.user);
            res.redirect('https://u09-team-vw.netlify.app/?loggedIn=true');
        });
    }
);


authRouter.get('/me', isAuthenticated, (req: Request, res: Response) => {
  if (!req.user) {

    res.status(401).json(errorResponse('Not authenticated', null));
    return;
  }
  res.json({ data: req.user }); 
});

export default authRouter;