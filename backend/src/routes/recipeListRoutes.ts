import { Router } from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import { addRecipeToList, createRecipeList, deleteRecipeList, editRecipeList, showRecipeList } from '../controllers/recipes/recipeListController';



const recipeRouter: Router = Router();

recipeRouter.post('/add-to-list', isAuthenticated, addRecipeToList);

recipeRouter.post('/create', isAuthenticated, createRecipeList);

recipeRouter.patch('/edit/:listId', isAuthenticated, editRecipeList);

recipeRouter.delete('/delete/:listId', isAuthenticated, deleteRecipeList);

recipeRouter.get('/showLists', isAuthenticated, showRecipeList);

export default recipeRouter;
