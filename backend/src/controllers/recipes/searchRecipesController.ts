import { Request, Response } from 'express';
import { apiKey } from '../../utils/apiKeys';
import { handleError } from '../../utils/errorHandler';
import { successResponse, errorResponse } from '../../utils/response';
import SpoonacularRecipe from '../../interfaces/Recipe/spoonacular';

export const searchRecipesByIngredients = async (req: Request, res: Response): Promise<void> => {
    try {
        // Get what user typed in search box from URL
        const ingredients = req.query.ingredients as string;

        if (!ingredients) {
            res.status(400).json(errorResponse('No ingredients provided.', null));
            return;
        }

        // format user input to a safe url and built it
        const spoonacularUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&number=5&apiKey=${apiKey}`;
        console.log(`[Spoonacular] API-anrop: ${spoonacularUrl} | Filter:`, req.query, `| ${new Date().toISOString()}`);
        const response = await fetch(spoonacularUrl);

        if (!response.ok) {
            handleError(`Spoonacular error: ${response.status}`, 'searchRecipesByIngredients');
            res.status(500).json(errorResponse('Failed to fetch recipes from Spoonacular.', null));
            return;
        }

        const data = await response.json();

        const spoonacularRecipes = await Promise.all(
            // get detailed data for each recipe
            data.map(async (r: SpoonacularRecipe) => {
                const detailsRes = await fetch(
                    `https://api.spoonacular.com/recipes/${r.id}/information?apiKey=${apiKey}`
                );
                // If fetching detailed data fails, return the recipe object without details
                if (!detailsRes.ok) {
                    return {
                        originalRecipeId: r.id,
                        title: r.title,
                        imageUrl: r.image,
                        readyInMinutes: null,
                        isVegetarian: null,
                        isGlutenfree: null,
                        isDairyfree: null
                    };
                }
                // return recipe object with recipe details
                const details = await detailsRes.json();
                return {
                    originalRecipeId: r.id,
                    title: r.title,
                    imageUrl: r.image,
                    readyInMinutes: details.readyInMinutes,
                    isVegetarian: details.vegetarian,
                    isGlutenfree: details.glutenFree,
                    isDairyfree: details.dairyFree
                };
            })
        );

        // return recipes with or without detailed data
        res.status(200).json(successResponse('Recipes fetched from Spoonacular', spoonacularRecipes));
    } catch (error) {
        handleError(error, 'searchRecipesByIngredients');
        res.status(500).json(errorResponse('An error occurred while searching for recipes.', error));
    }
};