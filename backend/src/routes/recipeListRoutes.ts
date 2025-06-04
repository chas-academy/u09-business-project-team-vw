import { Router } from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import { addRecipeToList, createRecipeList, editRecipeList, removeRecipeList, showUserRecipeList } from '../controllers/recipes/recipeListController';


const recipeRouter: Router = Router();

recipeRouter.post('/lists', isAuthenticated, createRecipeList);

recipeRouter.post('/recipes/:listId', isAuthenticated, addRecipeToList); 

recipeRouter.get('/recipeLists', isAuthenticated, showUserRecipeList);

recipeRouter.delete('/recipes/:listId/delete', isAuthenticated, removeRecipeList);

recipeRouter.patch('/recipes/:listId/edit', isAuthenticated, editRecipeList);