import { Router } from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';


const recipeRouter: Router = Router();

recipeRouter.post('/lists', isAuthenticated, () => {

});

recipeRouter.post('/lists/:listId/recipes', isAuthenticated, () => {

});