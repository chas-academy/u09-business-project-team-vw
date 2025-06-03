import mongoose from 'mongoose';
import { IRecipe } from '../../interfaces/Recipe/RecipeData';

const { Schema } = mongoose;

const RecipeSchema = new Schema<IRecipe>({
    originalRecipeId: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    imageUrl: { type: String },
    readyInMinutes: { type: Number },
    servings: { type: Number },
    instructions: { type: String },
    ingredients: { type: [String] },
    isVegetarian: { type: Boolean, default: false },
    isGlutenfree: { type: Boolean, default: false },
    isDairyfree: { type: Boolean, default: false },
    preparationMinutes: { type: Number },
    cookingMinutes: { type: Number },
    isCustom: { type: Boolean, default: false }
});

export const Recipe = mongoose.model<IRecipe>('Recipe', RecipeSchema);