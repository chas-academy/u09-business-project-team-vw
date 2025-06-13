import { Request, Response } from 'express';
import { Recipelist } from '../../models/Recipe/RecipeList';
import { Recipe } from '../../models/Recipe/Recipe';
import { successResponse, errorResponse } from '../../utils/response';
import { handleError } from '../../utils/errorHandler';
import mongoose from 'mongoose';


// CREATE A NEW LIST FROM RECIPES
export const createRecipeList = async (req: Request, res: Response) => {
    const user = req.user as { _id: string };
    const userId = user._id;
    const { name } = req.body;
   

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
        return;
    }
};

// ADD A RECIPE TO A LIST
export const addRecipeToList = async (req: Request, res: Response) => {

    console.log('Incoming request to add recipe to list');
    console.log('User:', req.user);
    console.log('List ID:', req.params.listId);
    console.log('Recipe ID:', req.body.recipeId);


    if (!req.user) {
        res.status(401).json(errorResponse('Unauthorized addRECIPETOLIST FILE', null));
        return;
    }

    const user = req.user as { _id: string };
    const userId = user._id;

    const { listId } = req.params;
    const { recipeId } = req.body;

    console.log('recipeId in request body:', recipeId);
    console.log('typeof recipeId:', typeof recipeId);

    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
        res.status(400).json(errorResponse('Invalid recipe ID', null));
        return;
    }


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
        const alreadyExists = Array.isArray(list.recipes) && list.recipes.some(r => r.toString() === recipeIdStr);
        if (alreadyExists) {
            res.status(409).json(errorResponse('The recipe already exists in this list', null));
            return;
        }

        list.recipes.push(recipe._id);
        await list.save();

        res.status(200).json(successResponse('Recipe added to list', 
            { 
            listId: list._id,
            addedRecipe: recipe
            }));

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
        const trimmedName = name?.trim();

        if(!trimmedName) {
            res.status(404).json(errorResponse('New name cannot be empty', null));
            return;
        }


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

        res.status(200).json(successResponse('Recipe list deleted and all correlating recpies are removed.', deletedList));

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
    } catch (error) {
        console.error(error);
        res.status(500).json(errorResponse('Server Error', null));
        return;
    }
};

export const getAllRecipeListsForUser = async (req: Request, res: Response) => {
    const userId = (req.user as { _id: string })._id;

    try {
        const lists = await Recipelist.find({ userId }).populate('recipes');

        res.status(200).json(successResponse('All recipe lists retrieved', lists));
    } catch (error) {
        handleError(error, 'recipeListController.ts');
        res.status(500).json(errorResponse('Server error', null));
    }
};

export const removeRecipeFromList = async (req: Request, res: Response) => {
    const user = req.user as {  _id: string };
    const { listId, recipeId } = req.params;

    try {

        const list = await Recipelist.findOne({ _id: listId, userId: user._id });

        if (!list) {
            res.status(404).json(errorResponse('Recipelist not found', null));
            return;
        }

        const initalCount = list.recipes.length;

        list.recipes = list.recipes.filter (
            (id) => id.toString() !== recipeId
        ) as typeof list.recipes;

        if(list.recipes.length === initalCount) {
            res.status(400).json(errorResponse('Recipe not found in list!', null));
            return;
        }

        await list.save();

        res.status(200).json(successResponse('Recipe removed from list!', list));

    } catch (error) {
        handleError(error, 'removeRecipeFromList.ts');
        res.status(500).json(errorResponse('couldnt remove recipe from list', error));
        return;
    }
};