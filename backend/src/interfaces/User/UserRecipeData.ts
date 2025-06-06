import mongoose, { Types } from 'mongoose';

export interface UserRecipeData extends mongoose.Document {
    userId: Types.ObjectId;
    originalRecipeId: number,
    title: string;
    imageUrl?: string;

    servings: number;
    instructions: string;
    ingredients: string[];

    preparationMinutes: number;
    cookingMinutes: number;
    readyInMinutes: number;

    isVegetarian: boolean;
    isGlutenfree: boolean;
    isDairyfree: boolean;

    notes?: string;
};