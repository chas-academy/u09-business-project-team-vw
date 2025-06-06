import { Request, Response } from 'express';
import { Recipe } from '../../models/Recipe/Recipe';
import SpoonacularRecipe from '../../interfaces/Recipe/spoonacular';
import { apiKey } from '../../utils/apiKeys';
import { handleError } from '../../utils/errorHandler';
import { successResponse, errorResponse } from '../../utils/response';
import RecipeFilter from '../../interfaces/Recipe/recipeFilter';

export const getAllRecipes = async (req: Request, res: Response): Promise<void> => {
    try {

        // Extract filter parameters from the URL, Ex ?vegetarian=true
        const { vegetarian, glutenFree, dairyFree } = req.query;

        // filter recipes in the database based on filter parameters.
        const dbFilter: RecipeFilter = {};
        if (vegetarian === 'true') dbFilter.isVegetarian = true;
        if (glutenFree === 'true') dbFilter.isGlutenfree = true;
        if (dairyFree === 'true') dbFilter.isDairyfree = true;
        
        
        // find all recipes in the database
        const recipes = await Recipe.find(
            // get only matching recipes
            dbFilter,
            // only select these fields
            'originalRecipeId title imageUrl readyInMinutes isVegetarian isGlutenfree isDairyfree'
        // Return plain JS objects instead of Mongoose documents
        ).lean();

        // try to fetch from Spoonacular
        try {
            let spoonacularUrl = `https://api.spoonacular.com/recipes/random?number=1&apiKey=${apiKey}`;
            // add filter parameters in url, otherwise randon recipes are fetched
            if (vegetarian === 'true') spoonacularUrl += '&tags=vegetarian';
            else if (glutenFree === 'true') spoonacularUrl += '&tags=gluten%20free';
            else if (dairyFree === 'true') spoonacularUrl += '&tags=dairy%20free';

            console.log(`[Spoonacular] API-anrop: ${spoonacularUrl} | Filter:`, req.query, `| ${new Date().toISOString()}`);

            // fetches 10 random recipes from Spoonacular API
            const response = await fetch(spoonacularUrl);

            // check if spoonacular request was not successful
            if (!response.ok) {
                // Spoonacular failed but return recipes from DB
                handleError(`Spoonacular error: ${response.status}`, 'getAllRecipes - Spoonacular');
                res.status(200).json(
                    successResponse('Recipes fetched from DB only (Spoonacular failed)', recipes)
                );
                return;
            }

            const data = await response.json();

            // check if response is
            if (!data.recipes || !Array.isArray(data.recipes) || data.recipes.length === 0) {
                res.status(200).json(
                    successResponse('Recipes fetched from DB only (No recipes from Spoonacular)', recipes)
                );
                return;
            }

            // change every spoonacular data object to the same format as the database
            const spoonacularRecipes = data.recipes.map((r: SpoonacularRecipe) => ({
                originalRecipeId: r.id,
                title: r.title,
                imageUrl: r.image,
                readyInMinutes: r.readyInMinutes,
                isVegetarian: r.vegetarian,
                isGlutenfree: r.glutenFree,
                isDairyfree: r.dairyFree
            }));

            // return both lists if Spoonacular succeeded
            res.status(200).json(
                successResponse('Recipes fetched from both DB and Spoonacular', 
                [...recipes, ...spoonacularRecipes])
            );
        } catch (apiError) {
            // if Spoonacular fails, log the error in terminal and return only the database recipes
            handleError(apiError, 'getAllRecipes - Spoonacular');
            res.status(200).json(
                successResponse('Recipes fetched from DB only (Spoonacular exception)', recipes)
            );
        }

    } catch (dbError) {
        // if both database and Spoonacular fails, log the error and send an error message
        handleError(dbError, 'getAllRecipes - DB');
        res.status(500).json(
            errorResponse('Could not fetch recipes from database.', dbError)
        );
    }
};