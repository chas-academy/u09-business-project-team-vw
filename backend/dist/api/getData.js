"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Recipe_1 = require("../models/Recipe/Recipe");
const apiKeys_1 = require("../utils/apiKeys");
// Remove for live
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../utils/config");
async function getRecipe() {
    // Remove for live
    await mongoose_1.default.connect(config_1.MONGODB_URI);
    console.log("✅ Connected to MongoDB");
    const response = await fetch(`https://api.spoonacular.com/recipes/informationBulk?ids=715538,716429&apiKey=${apiKeys_1.apiKey}`);
    const recipeData = await response.json();
    // Loop through the response data from API
    for (const r of recipeData) {
        const existing = await Recipe_1.Recipe.findOne({ originalRecipeId: r.id });
        // Check if the recipe ID already is saved in the database.
        if (existing) {
            console.log(`LOG: getData.ts - Row 12 - Temporary: ${r.id} Already saved in the database, skipping`);
            continue;
        }
        // If not already existing, save it to the database.
        const newRecipe = new Recipe_1.Recipe({
            originalRecipeId: r.id,
            title: r.title,
            imageUrl: r.image,
            readyInMinutes: r.readyInMinutes,
            servings: r.servings,
            instructions: r.instructions,
            ingredients: r.extendedIngredients.map((i) => i.original),
            preparationMinutes: r.preparationMinutes,
            cookingMinutes: r.cookingMinutes,
            isVegetarian: r.vegetarian,
            isGlutenfree: r.glutenFree,
            isDairyfree: r.dairyFree,
        });
        await newRecipe.save();
        console.log(`LOG: getData.ts - Row 33 - Temporary: ${r.title} SUCCESS: Saved `);
    }
    // Remove for live
    await mongoose_1.default.disconnect();
    console.log("🚪 MongoDB connection closed");
}
;
getRecipe();
