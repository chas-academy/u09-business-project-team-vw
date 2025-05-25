import { Recipe } from "../models/Recipe/Recipe";
import { apiKey } from "../utils/apiKeys"

// Remove for live
import mongoose from 'mongoose';
import { MONGODB_URI } from '../utils/config';

async function getRecipe() {

    const response = await fetch(`https://api.spoonacular.com/recipes/informationBulk?ids=715538,716429&apiKey=${apiKey}`)
    const recipeData = await response.json();

    // Loop through the response data from API
    for (const r of recipeData) {
        const existing = await Recipe.findOne({ originalRecipeId: r.id });

        // Check if the recipe ID already is saved in the database.
        if (existing) {
            console.log(`LOG: getData.ts - Row 12 - Temporary: ${r.id} Already saved in the database, skipping`);
            continue;
        }

        // If not already existing, save it to the database.
        const newRecipe = new Recipe({
        originalRecipeId: r.id,
        title: r.title,
        imageUrl: r.image,
        readyInMinutes: r.readyInMinutes,
        servings: r.servings,
        instructions: r.instructions,
        ingredients: r.extendedIngredients.map((i: any) => i.original),
        preparationMinutes: r.preparationMinutes,
        cookingMinutes: r.cookingMinutes,
        isVegetarian: r.vegetarian,
        isGlutenfree: r.glutenFree,
        isDairyfree: r.dairyFree,
    });

    await newRecipe.save();
    console.log(`LOG: getData.ts - Row 33 - Temporary: ${r.title} SUCCESS: Saved `)
    }
};

getRecipe();