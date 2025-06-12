export interface Recipe {
  _id: string;
  originalRecipeId: number;
  title: string;
  imageUrl?: string;
  servings: number;
  preparationMinutes: number;
  cookingMinutes: number;
  readyInMinutes: number;
  isVegetarian: boolean;
  isGlutenfree: boolean;
  isDairyfree: boolean;
  instructions: string;
  ingredients: string[];
}