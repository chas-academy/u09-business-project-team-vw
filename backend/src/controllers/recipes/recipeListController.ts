import { Request, Response } from 'express';
import { Recipelist } from '../../models/Recipe/RecipeList';
import { Recipe } from '../../models/Recipe/Recipe';
import { successResponse, errorResponse } from '../../utils/response';
import { handleError } from '../../utils/errorHandler';


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
        const list = await Recipelist.findOne({ _id: listId, userId });

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

    // EDIT A RECIPE LIST
    export const editRecipeList = async (req: Request, res: Response) => {
    const { listId } = req.params;
    const { name } = req.body;
    const userId = (req.user as { _id: string })._id;

    if (!name) {
        res.status(400).json(errorResponse('New name is required', null));
        return;
    }

    try {
        const updatedList = await Recipelist.findOneAndUpdate(
            { _id: listId, userId },
            { name },
            { new: true }
        );

        if (!updatedList) {
            res.status(404).json(errorResponse('Recipe list not found', null));
            return;
        }

        res.status(200).json(successResponse('Recipe list updated', updatedList));
    } catch (error) {
        handleError(error, 'recipeListController.ts');
        res.status(500).json(errorResponse('Could not update recipe list', null));
    }
};

// DELETE A RECIPE LIST
export const deleteRecipeList = async (req: Request, res: Response) => {
    const { listId } = req.params;
    const userId = (req.user as { _id: string })._id;

    try {
        const deletedList = await Recipelist.findOneAndDelete({ _id: listId, userId });

        if (!deletedList) {
            res.status(404).json(errorResponse('Recipe list not found', null));
            return;
        }

        res.status(200).json(successResponse('Recipe list deleted', deletedList));
    } catch (error) {
        handleError(error, 'recipeListController.ts');
        res.status(500).json(errorResponse('Could not delete recipe list', null));
    }
};

export const showRecipeList = async (req: Request, res: Response) => {
    const { listId } = req.params;
    const userId = (req.user as { _id: string })._id;

    try {
        const list = await Recipelist.findOne({ _id: listId, userId }).populate('recipes');

        if (!list) {
            res.status(404).json(errorResponse('Recipe list not found', null));
            return;
        }

        res.status(200).json(successResponse('Recipe list retrieved', list));
        return
    } catch (error) {
        console.error(error);
        res.status(500).json(errorResponse('Server Error', null));
        return;
    }
};