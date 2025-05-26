import { Request, Response } from 'express';
import { User } from '../models/User/UserModel';
import { successResponse, errorResponse } from '../utils/response';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().select('-__v');

        res.status(200).json(successResponse('Fetched all users', users));
        return;
    } catch (error) {
        res.status(500).json(errorResponse('Coulnd fetch all users', null));
        return;
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);

        res.status(200).json(successResponse(`Deleted user${id}`, null));
        return;
    } catch (error) {
        res.status(500).json(errorResponse('Couldnt delete the user', error));
        return;
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await User.findById(id);

        res.status(200).json(successResponse('fetched User by id', id));
        return;
    } catch (error) {
        res.status(500).json(errorResponse('Couldnt find or fetch the user', error));
        return;
    }
};