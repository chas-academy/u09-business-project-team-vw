import mongoose, { ObjectId } from 'mongoose';

export interface IRecipeList extends mongoose.Document {
    name: string;
    userId: ObjectId;
    recipes: ObjectId;
    timestamps: boolean;
}