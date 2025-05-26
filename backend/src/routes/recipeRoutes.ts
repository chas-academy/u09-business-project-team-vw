import { Router, Request, Response } from "express";
import { isAuthenticated, isAdmin } from "../middleware/isAuthenticated";

const recipeRouter: Router = Router();

recipeRouter.get('/recipe/index', (req: Request, res: Response) => {
    res.sendStatus(200);
});

recipeRouter.get('/recipe/search', (req: Request, res: Response) => {
    res.sendStatus(200);
});

recipeRouter.get('/recipe/:id', (req: Request, res: Response) => {
    res.sendStatus(200);
});

recipeRouter.patch('/recipe/:id/update', (req: Request, res: Response) => {
    res.sendStatus(200);
});

recipeRouter.post('/recipe/:id/save', (req: Request, res: Response) => {
    res.sendStatus(201);
});

recipeRouter.delete('/recipe/:id', (req: Request, res: Response) => {
    res.sendStatus(200);
});