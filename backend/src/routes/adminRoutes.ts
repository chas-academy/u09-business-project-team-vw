import { Router, Request, Response } from 'express';
import passport from 'passport';
import { isAuthenticated, isAdmin } from '../middleware/isAuthenticated';

const adminRouter: Router = Router();

adminRouter.get('/dashboard', isAuthenticated, isAdmin, (req: Request, res: Response) => {
    res.json({ message: 'Welcome to the Admin Panel!' });
});

export default adminRouter;