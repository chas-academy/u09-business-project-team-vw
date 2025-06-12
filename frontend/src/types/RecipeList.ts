import type { Recipe } from "../interfaces/recipe.interface";

export type RecipeList = { 
    _id: string;
    title: string;
    createdAt?: string;
    isFavorite?: boolean;
    name: string;
    recipes: Recipe[];
}