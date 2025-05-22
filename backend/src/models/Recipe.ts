import mongoose, { Schema } from 'mongoose';
import { IRecipe } from '../types/RecipeData';

const RecipeSchema = new Schema<IRecipe>({
    apiId: { type: String, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String },
    instructions: { type: String },
    tags: { type: [String] },
    category: { type: String, required: true },
    ingriendts: [
        {
            name: { type: String },
            amount: { type: String }
        }
    ]
});

export const Recipe = mongoose.model<IRecipe>('Recipe', RecipeSchema);