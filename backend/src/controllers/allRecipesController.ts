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

        // try to fetch from Spoonacular
        try {
            const spoonacularUrl = `https://api.spoonacular.com/recipes/random?number=10&apiKey=${apiKey}`;
            // fetches 10 random recipes from Spoonacular API
            const response = await fetch(spoonacularUrl);

            // check if the request was successful
            if (!response.ok) {
                throw new Error(`Spoonacular error: ${response.status}`);
            }

            const data = await response.json();

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
            res.json([...recipes, ...spoonacularRecipes]);
        } catch (err) {
            // if Spoonacular fails, log the error in terminal and return only the database recipes
            handleError(err, 'getAllRecipes - Spoonacular');
            res.json(recipes);
        }

    } catch (err) {
        // if both database and Spoonacular fails, log the error and send an error message
        handleError(err, 'getAllRecipes');
        res.status(500).json({ message: 'Could not fetch any recipes.' });
    }
};


/*

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
        // fetches 10 random recipes from Spoonacular API
        const response = await fetch(spoonacularUrl);
        // check if the request was successful otherwise skip ahead to catch
        if (!response.ok) {
            throw new Error(`Spoonacular error: ${response.status}`);
        }
        const data = await response.json();

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

        // combine the database and spoonacular lists of recipes and send them to frontend
        res.json([...recipes, ...spoonacularRecipes]);
    } catch (err) {
        // log the error in terminal
        handleError(err, 'getAllRecipes');
        res.status(500).json({ message: (err as Error).message });
    }
};

*/