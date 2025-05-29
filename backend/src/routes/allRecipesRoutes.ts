import { Router } from 'express';
import { getAllRecipes } from '../controllers/recipes/allRecipesController';


const recipeRouter: Router = Router();

recipeRouter.get('/', getAllRecipes);

export default recipeRouter;