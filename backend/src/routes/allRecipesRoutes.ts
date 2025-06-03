import { Router } from 'express';
import { getAllRecipes } from '../controllers/recipes/allRecipesController';
import { searchRecipesByIngredients } from '../controllers/recipes/searchRecipesController';
import { getOrFetchRecipe, saveRecipe } from '../controllers/recipes/recipeController';


const recipeRouter: Router = Router();

recipeRouter.get('/search', searchRecipesByIngredients);
recipeRouter.get('/', getAllRecipes);
recipeRouter.get('/:id', getOrFetchRecipe);
recipeRouter.post('/:id/save', saveRecipe);

export default recipeRouter;