import { Router, Request, Response, response } from 'express';
import { isAdmin, isAuthenticated } from '../middleware/isAuthenticated';

const userRouter: Router = Router();

userRouter.get('/user/homepage', isAuthenticated, isAdmin, (req: Request, res: Response) => {
    res.sendStatus(200);
});

userRouter.patch('/user/:id/patch', isAuthenticated, isAdmin, (req: Request, res: Response) => {
    res.sendStatus(200);
});

userRouter.delete('/user/:id/delete', isAuthenticated, isAdmin, (req: Request, res: Response) => {
    res.sendStatus(204);
});

export default userRouter;

