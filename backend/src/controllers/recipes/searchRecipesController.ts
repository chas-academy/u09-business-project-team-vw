import { Request, Response } from 'express';
import { apiKey } from '../../utils/apiKeys';
import { handleError } from '../../utils/errorHandler';
import { successResponse, errorResponse } from '../../utils/response';
import SpoonacularRecipe from '../../interfaces/Recipe/spoonacular';

export const searchRecipesByIngredients = async (req: Request, res: Response): Promise<void> => {
    try {
        const ingredients = req.query.ingredients as string;

        if (!ingredients) {
            res.status(400).json(errorResponse('No ingredients provided.', null));
            return;
        }

        const spoonacularUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&number=10&apiKey=${apiKey}`; 
        const response = await fetch(spoonacularUrl);

        if (!response.ok) {
            handleError(`Spoonacular error: ${response.status}`, 'searchRecipesByIngredients');
            res.status(500).json(errorResponse('Failed to fetch recipes from Spoonacular.', null));
            return;
        }

        const data = await response.json();

        const spoonacularRecipes = data.map((r: SpoonacularRecipe) => ({
            originalRecipeId: r.id,
            title: r.title,
            imageUrl: r.image,
            readyInMinutes: r.readyInMinutes,
            isVegetarian: r.vegetarian,
            isGlutenfree: r.glutenFree,
            isDairyfree: r.dairyFree
        }));

        res.status(200).json(successResponse('Recipes fetched from Spoonacular', spoonacularRecipes));
    } catch (error) {
        handleError(error, 'searchRecipesByIngredients');
        res.status(500).json(errorResponse('An error occurred while searching for recipes.', error));
    }
};
