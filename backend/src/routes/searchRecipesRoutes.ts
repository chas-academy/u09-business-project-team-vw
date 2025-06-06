import { Router } from 'express';
import { searchRecipesByIngredients } from '../controllers/recipes/searchRecipesController';


const searchRouter = Router();

// Route for searching recipes by ingredients
searchRouter.get('/search', searchRecipesByIngredients);

export default searchRouter;
