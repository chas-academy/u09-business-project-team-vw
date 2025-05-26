import { Request, Response, Router } from 'express';
import { Recipe } from '../models/Recipe/Recipe';

const recipeRouter: Router = Router();

recipeRouter.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        // find all recipes in the database
        const recipes = await Recipe.find(
            // no filter, get all objects
            {},
            // only select these fields
            'originalRecipeId title imageUrl readyInMinutes isVegetarian isGlutenfree isDairyfree'
        // Return plain JS objects instead of Mongoose documents
        ).lean();
        res.json(recipes); 
    } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
});

export default recipeRouter;