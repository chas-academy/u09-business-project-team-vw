import { Router } from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import { addRecipeToList, createRecipeList, deleteRecipeList, editRecipeList, showRecipeList, getAllRecipeListsForUser } from '../controllers/recipes/recipeListController';

const recipeListRouter: Router = Router();

recipeListRouter.post('/add/:listId', isAuthenticated, addRecipeToList);

recipeListRouter.post('/create', isAuthenticated, createRecipeList);

recipeListRouter.patch('/edit/:listId', isAuthenticated, editRecipeList);

recipeListRouter.delete('/delete/:listId', isAuthenticated, deleteRecipeList);

recipeListRouter.get('/show', isAuthenticated, showRecipeList);

recipeListRouter.get('/all', isAuthenticated, getAllRecipeListsForUser);


export default recipeListRouter;
