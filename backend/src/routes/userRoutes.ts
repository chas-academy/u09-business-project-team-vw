import { Router, Request, Response } from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import { AuthenticatedRequest } from '../interfaces/auth/AuthenticatedRequest';

const userRouter: Router = Router();


// USER
// Startpage when logged in as user.
userRouter.get('/homepage', isAuthenticated, (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    res.sendStatus(200);
});

// Profile settings for user, to update name and so on.
userRouter.patch('/:id', isAuthenticated, (req: Request, res: Response) => {
    res.sendStatus(200);
});

// User delete its account themself.
userRouter.delete('/:id', isAuthenticated, (req: Request, res: Response) => {
    res.sendStatus(204);
});


// RECIPELIST CONNECTED TO USER

// Create a recipeList for a specifik user.
userRouter.post('/:id/recipe-lists', isAuthenticated, (req: Request, res: Response) => {
    res.sendStatus(201);
});


// Show all recipeList for this user
userRouter.get('/:id/recipe-lists', isAuthenticated, (req: Request, res: Response) => {
    res.sendStatus(200);
});


// Get a specifik recipeList based on ID
userRouter.get('/:id/recipe-listst/:listId', isAuthenticated, (req: Request, res: Response) => {
    res.sendStatus(200);
});

// Update a recipeList with patch
userRouter.patch('/:id/recipe-listst/:listId', isAuthenticated, (req: Request, res: Response) => {
    res.sendStatus(200);
});


// Delete a recipelist
userRouter.delete('/recipeList/delete/:id', isAuthenticated, (req: Request, res: Response) => {
    res.sendStatus(204);
});


// Save a recipelist
userRouter.get('/recipeList/save', isAuthenticated, (req: Request, res: Response) => {
    res.sendStatus(200);
});


export default userRouter;

