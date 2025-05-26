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