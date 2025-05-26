export interface Recipe {
  originalRecipeId: number;
  title: string;
  imageUrl?: string;
  readyInMinutes: number;
  isVegetarian: boolean;
  isGlutenfree: boolean;
  isDairyfree: boolean;
}