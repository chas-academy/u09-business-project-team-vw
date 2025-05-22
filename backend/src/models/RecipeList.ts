import mongoose, { Schema } from 'mongoose';
import { IUserRecipeList } from '../types/UserRecipeListData';


const UserRecipeListSchema = new Schema<IUserRecipeList> ({ 
    user_id: { type: String, required: true },
    name: { type: String, default: "A List" },
    // Need to add all the features from the API here.
    /*recipes: { type: mongoose.objectId }*/

});

export const UserRecipeList = mongoose.model<IUserRecipeList>('UserRecipe', UserRecipeListSchema)