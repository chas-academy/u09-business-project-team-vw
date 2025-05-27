import { Request, Response } from 'express';
import { Recipe } from '../models/Recipe/Recipe';
import SpoonacularRecipe from '../interfaces/Recipe/spoonacular';
import { apiKey } from '../utils/apiKeys';
import { handleError } from '../utils/errorHandler';

export const getAllRecipes = async (req: Request, res: Response): Promise<void> => {
    try {
        // find all recipes in the database
        const recipes = await Recipe.find(
            // no filter, get all objects
            {},
            // only select these fields
            'originalRecipeId title imageUrl readyInMinutes isVegetarian isGlutenfree isDairyfree'
        // Return plain JS objects instead of Mongoose documents
        ).lean();

        const spoonacularUrl = `https://api.spoonacular.com/recipes/random?number=10&apiKey=${apiKey}`;
        const response = await fetch(spoonacularUrl);
        if (!response.ok) {
            throw new Error(`Spoonacular error: ${response.status}`);
        }
        const data = await response.json();

        const spoonacularRecipes = data.recipes.map((r: SpoonacularRecipe) => ({
            originalRecipeId: r.id,
            title: r.title,
            imageUrl: r.image,
            readyInMinutes: r.readyInMinutes,
            isVegetarian: r.vegetarian,
            isGlutenfree: r.glutenFree,
            isDairyfree: r.dairyFree
        }));

        res.json([...recipes, ...spoonacularRecipes]);
    } catch (err) {
        handleError(err, 'getAllRecipes');
        res.status(500).json({ message: (err as Error).message });
    }
};