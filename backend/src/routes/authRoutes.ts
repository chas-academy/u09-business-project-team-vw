import { Router, Response, Request } from 'express';
import passport from 'passport';
import { isAuthenticated } from '../middleware/isAuthenticated'; // <-- Middleware

const authRouter: Router = Router();

// Google Auth login
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: true }),
    (req: Request, res: Response) => {
        res.redirect('/success');
    }
);

// Middleware
authRouter.get('/me', isAuthenticated, (req: Request, res: Response) => {
        res.json(req.user);
});

authRouter.get('/logout', (req: Request, res: Response) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ message: 'logout failed', error: err });
        res.redirect('/');
    });
});

export default authRouter;