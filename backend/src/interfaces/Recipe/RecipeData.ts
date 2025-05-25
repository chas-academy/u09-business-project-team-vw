import mongoose from 'mongoose';

export interface IRecipe extends mongoose.Document {
   id: number;
   originalRecipeId: Number;
   title: string;
   imageUrl?: string;
   readyInMinutes: number;
   servings: number;
   instructions: string;
   ingredients: string[];
   isVegetarian: boolean;
   isGlutenfree: boolean;
   isDairyfree: boolean;
   preparationMinutes: number;
   cookingMinutes: number;
};