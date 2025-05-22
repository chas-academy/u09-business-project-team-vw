export interface IRecipe extends Document {
   id: Object;
   apiId: string;
   name: string;
   imageUrl?: string;
   instructions: string;
   tags: [string];
   category: string;
   ingriendts: [
    {
        name: string;
        amount: string;
    }
   ]
}