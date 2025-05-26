import { Router, Request, Response } from 'express';
import { successResponse, errorResponse } from '../utils/response';
import { isAuthenticated } from '../middleware/isAuthenticated';


const recipeRouter: Router = Router();

recipeRouter.post('/lists', isAuthenticated, (req: Request, res: Response) => {

});

recipeRouter.post('/lists/:listId/recipes', isAuthenticated, (req: Request, res: Response) => {

});