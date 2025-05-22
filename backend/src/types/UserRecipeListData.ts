export interface IUserRecipeList extends Document {
    user_id: string;
    name: string;
    recipes: {
        // We will add the object for each recipe here
    }
};
