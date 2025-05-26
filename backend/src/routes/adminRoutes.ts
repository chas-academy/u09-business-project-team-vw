import { Router, Request, Response } from 'express';
import { isAuthenticated, isAdmin } from '../middleware/isAuthenticated';

const adminRouter: Router = Router();

adminRouter.get('/dashboard', isAuthenticated, isAdmin, (req: Request, res: Response) => {
    res.sendStatus(200);
});

adminRouter.get('/dashboard/:id', isAuthenticated, isAdmin, (req: Request, res: Response) => {
    res.sendStatus(200)
});

adminRouter.delete('/dashboard/user/:id', isAuthenticated, isAdmin, (req: Request, res: Response) => {
    res.sendStatus(200)
});

adminRouter.patch('/dashboard/user/:id/patch', isAuthenticated, isAdmin, (req: Request, res: Response) => {
    res.sendStatus(200)
});

export default adminRouter;