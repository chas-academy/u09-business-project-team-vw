import { Request, Response } from 'express';
import { Recipe } from '../../models/Recipe/Recipe';
import { apiKey } from '../../utils/apiKeys';
import { successResponse, errorResponse } from '../../utils/response';
import { handleError } from '../../utils/errorHandler';
import { Ingredient } from '../../interfaces/Recipe/Ingredient';

export const getOrFetchRecipe = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const existingRecipe = await Recipe.findOne({ originalRecipeId: id });
        // Check if the recipe is already stored in the database
        if(existingRecipe) {
            res.status(200).json(successResponse('Recipe found in DB', existingRecipe));
            return;
        }

        // Fetch from the API
        const response = await fetch(
            `https://api.spoonacular.com/recipes/informationBulk?ids=${id}&apiKey=${apiKey}`
        );

        const recipeArray = await response.json();

        if(!Array.isArray(recipeArray) || recipeArray.length === 0) {
            res.status(404).json(errorResponse('No recipe found with that ID', null));
            return;
        }

        const [recipeData] = recipeArray;

        if(!recipeData) {
            res.status(404).json(errorResponse('Recipe not found in Spoonacular', null));
        }

        // If user saves the recipe to its own recipelist. Then store it in the database.
        const newRecipe = new Recipe({

        originalRecipeId: recipeData.id,
        title: recipeData.title,
        imageUrl: recipeData.image,
        readyInMinutes: recipeData.readyInMinutes,
        servings: recipeData.servings,
        instructions: recipeData.instructions,
        ingredients: recipeData.extendedIngredients.map((i: Ingredient) => i.original),
        preparationMinutes: recipeData.preparationMinutes,
        cookingMinutes: recipeData.cookingMinutes,
        isVegetarian: recipeData.vegetarian,
        isGlutenfree: recipeData.glutenFree,
        isDairyfree: recipeData.dairyFree,

        });

        await newRecipe.save();

        res.status(201).json(successResponse('Recipe fetched and saved', newRecipe));
        return;

    } catch (error) {
        handleError(error, 'recipeController.ts');
        res.status(500).json(errorResponse('Internal server error', error));
    }
};
