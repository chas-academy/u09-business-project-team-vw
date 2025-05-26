import { Router, Request, Response, response } from 'express';
import { isAdmin, isAuthenticated } from '../middleware/isAuthenticated';

const userRouter: Router = Router();

userRouter.get('/user/index', isAuthenticated, isAdmin, (req: Request, res: Response) => {
    res.sendStatus(200);
});

userRouter.get('/user/recipes', isAuthenticated, isAdmin, (req: Request, res: Response) => {
    res.sendStatus(200);
});



export default userRouter;

