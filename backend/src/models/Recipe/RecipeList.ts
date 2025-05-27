import { Schema, model, Types } from 'mongoose';

const recipeListSchema = new Schema({ 
    name: { type: String, default: 'New List' },
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    recipes: [{ type: Types.ObjectId, ref: 'Recipe', required: true }],
}, { timestamps: true });

export const Recipelist = model('RecipeList', recipeListSchema);