interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  vegetarian: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
}

export default SpoonacularRecipe;