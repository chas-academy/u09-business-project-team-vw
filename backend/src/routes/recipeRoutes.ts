import { Router } from 'express';
import { getAllRecipes } from '../controllers/allRecipesController';


const recipeRouter: Router = Router();

recipeRouter.get('/', getAllRecipes);

export default recipeRouter;