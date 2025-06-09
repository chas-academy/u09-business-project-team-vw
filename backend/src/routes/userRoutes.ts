import { Router, Response, Request } from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import { successResponse, errorResponse } from '../utils/response';
<<<<<<< HEAD
import { deleteMyUser, editMyUser, getMyUser } from '../controllers/userController';

=======
import { SessionData } from 'express-session';
import { deleteMyUser, editMyUser, getMyUser } from '../controllers/userController';


// Type to remove session data
type CustomSession = SessionData & {
    userId?: string;
    destroy: (callback: (err?: unknown) => void) => void;
};

>>>>>>> c684264cd8fa1300f2f640949d8ff5148a135a71
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

<<<<<<< HEAD
        res.clearCookie('connect.sid', {
            path: '/',
            sameSite: 'none',
            secure: true,
        });
        
=======
        res.clearCookie('connect.sid');
>>>>>>> c684264cd8fa1300f2f640949d8ff5148a135a71
        res.status(200).json(successResponse('Logout successful!', null));
        return;
    });
});

userRouter.delete('/delete', isAuthenticated, deleteMyUser);

userRouter.patch('/update', isAuthenticated, editMyUser);

userRouter.get('/me', isAuthenticated, getMyUser);

export default userRouter;