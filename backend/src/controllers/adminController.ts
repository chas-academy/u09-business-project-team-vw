import { Request, Response } from 'express';
import { User } from '../models/User/UserModel';
import { successResponse, errorResponse } from '../utils/response';


// Controller to fetch all users from the database
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        // Find all users and exclude the __v field
        const users = await User.find().select('-__v');

        // Return success response with the list of users
        res.status(200).json(successResponse('Fetched all users', users));
        return;
    } catch (error) {
        res.status(500).json(errorResponse('Couldnt fetch all users', error));
        return;
    }
};

// Controller to delete a user by ID
export const deleteUser = async (req: Request, res: Response) => {
    try {
        // Extract the user ID from the route parameters
        const { id } = req.params;

        // find and delete the user from the database
        await User.findByIdAndDelete(id);

        // Return a success message after deletion
        res.status(200).json(successResponse(`Deleted user${id}`, null));
        return;
    } catch (error) {
        res.status(500).json(errorResponse('Couldnt delete the user', error));
        return;
    }
};

// Controller to fetch a specific user by ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        // Extract the user ID from the route parameters
        const { id } = req.params;

        // Find the user in the database
        const user = await User.findById(id);

        // IF the user cannot be found, return a 404 response
        if(!user) {
            res.status(404).json(errorResponse('User Not Found', null));
            return;
        }

        // Return the found user
        res.status(200).json(successResponse('User Fetched', user));
        return;
    } catch (error) {
        res.status(500).json(errorResponse('Couldnt find or fetch the user', error));
        return;
    }
};