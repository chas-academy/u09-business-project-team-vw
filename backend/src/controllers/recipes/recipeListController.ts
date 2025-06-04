import { Request, Response } from 'express';
import { Recipelist } from '../../models/Recipe/RecipeList';
import { Recipe } from '../../models/Recipe/Recipe';
import { UserData } from '../../interfaces/User/UserData';
import { successResponse, errorResponse } from '../../utils/response';
import { handleError } from '../../utils/errorHandler';
import { error } from 'console';


// CREATE A NEW LIST FROM RECIPES
export const createRecipeList = async (req: Request, res: Response) => {
    const { name } = req.body;
    const userId = req.user;

    if(!name) {
        res.status(400).json(errorResponse('List name is required', null));
        return;
    }

    try {
        const newList = new Recipelist({ name, userId });
        await newList.save();

        res.status(201).json(successResponse('Recipe list created', newList));
    } catch (error) {
        handleError(error, 'recipeController.ts');
        res.status(500).json(errorResponse('Could not create list', error));
    }
};


// ADD A RECIPE TO A LIST
export const addRecipeToList = async (req: Request, res: Response) => {
    const user = req.user as { _id: string };
    const userId = user._id;

    const { listId } = req.params;
    const { recipeId } = req.body;
    
    
        if(!recipeId) {
            res.status(404).json(errorResponse('Recipe not found', null));
            return;
        }

    try {
        // get list the belongs to user ID
        const list = await Recipelist.findOne({ id: listId, userId });

        if(!list){
            res.status(404).json(errorResponse('Recipe list not found', null));
            return;
        }

    
        const recipe = await Recipe.findById(recipeId);

        if(!recipe) {
            res.status(404).json(errorResponse('Recipe not found', null));
            return;
       }

       // Check if recipe already exists in the list
        const recipeIdStr = recipe._id.toString();
        const alreadyExists = list.recipes.some(r => r.toString() === recipeIdStr);
        if (alreadyExists) {
            res.status(409).json(errorResponse('The recipe already exists in this list', null));
            return;
        }

        list.recipes.push(recipe._id);
        await list.save();

        res.status(200).json(successResponse('Recipe added to list', list));
    } catch (error) {
        handleError(error, 'recipeListController.ts');
        res.status(500).json(errorResponse('Could not add the recipe to list', null));
        return;
    }
};


export const showUserRecipeList = async (req: Request, res: Response) => {
    const user = req.user as UserData;
    const userId = user._id;

    try {
        const lists = await Recipelist.find({ userId }).populate('recipes');

        res.status(200).json(successResponse('Recipe list found', lists));

    } catch (error) {
        res.status(500).json(errorResponse('Could not fetch recipe lists', error));
        return;
    }
};

export const removeRecipeList = async( req: Request, res: Response) => {
    const user = req.user as UserData;
    const userId = user._id;
    const { listId } = req.params;

    try {

        const removeList = await Recipelist.findOne({ _id: listId, userId });

        if(!removeList) {
            res.status(404).json(errorResponse('list was not found', error));
            return;
        }

        await Recipelist.findByIdAndDelete(listId);

        res.status(200).json(successResponse('list deleted!', null));


    } catch (error) {
        res.status(500).json(errorResponse('Recipe list was not removed', error));
        return;
    }
};

export const editRecipeList = async(req: Request, res: Response) => {
    const user = req.user as UserData;
    const userId = user._id;
    const { listId } = req.params;
    const { name } = req.body;
    
    try {

        const editRecipeList = await Recipelist.findOne({ _id: listId, userId });

        if(!editRecipeList) {
            res.status(404).json(errorResponse('list was not found', error));
            return;
        }

        const updatedRecpieList = await Recipelist.findByIdAndUpdate (
            listId, 
            { name },
            { new: true } 
        );

        res.status(200).json(successResponse('RecipeList updated successfully!', updatedRecpieList));

    } catch (error) {
        res.status(500).json(errorResponse('Couldnt edit the list', error));
        return;
    }
}