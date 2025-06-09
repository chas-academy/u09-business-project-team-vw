import { Request, Response } from 'express';
import { UserData } from '../interfaces/User/UserData';
import { User } from '../models/User/UserModel';
import { errorResponse, successResponse } from '../utils/response';


// Controller for deleting the currently logged-in user's account
export const deleteMyUser = async (req: Request, res: Response) => {
    try {
        const user = req.user as UserData;
        const userId = user._id;

         // If no user ID is found in session, respond with 401
        if(!userId) {
            res.status(401).json(errorResponse('Not Authenticated', null));
            return;
        }

        // Delete the user from the database
        await User.findByIdAndDelete(userId);

        // Log the user out using Passport
        req.logout((logOutError) => {
            if(logOutError) {
                res.status(500).json(errorResponse('Failed to log out', logOutError));
                return;
            }
        });

        // Destroy the session and clear the session cookie
        req.session.destroy((sessionError) => {
            if(sessionError) {
                res.status(500).json(errorResponse('Account deleted, but session could not be destoyed.', sessionError));
                return;
            }

            res.clearCookie('connect.sid'); // Clear the session cookie
            res.status(200).json(successResponse('Accout deleted and logged out, redirecting', null));
        });
    } catch (error) {
        res.status(500).json(errorResponse('Couldnt delete your account', error));
        return;
    }
};

// Controller for updating the currently logged-in user's data
export const editMyUser = async(req: Request, res: Response) => {
    try {
        const user = req.user as UserData;
        const userId = user._id;

        // If no user ID is found in session, respond with 401
        if(!userId) {
            res.status(401).json(errorResponse('Not Authenticated', null));
            return;
        }

        const { displayName } = req.body;


        // validation for name
        if(!displayName || typeof displayName !== 'string' || displayName.trim().length === 0) {
            res.status(400).json(errorResponse('Cannot be empty', null));
            return;
        }

        // Update the user's name
        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            { displayName }, 
            { new: true }
        );

        if(!updatedUser) {
            res.status(404).json(errorResponse('User not found', null));
            return;
        }

        res.status(200).json(successResponse('User updated successfully!', updatedUser));

    } catch (error) {

        res.status(500).json(errorResponse('Couldnt edit your profile', error));
        return;
    }
};

// Controller for fetching the currently logged-in user's full profile
export const getMyUser = async (req: Request, res: Response) => {
    
    try {
        const user = req.user as UserData;

        // Check if the user is authenticated
        if(!user || !user._id) {
            res.status(401).json(errorResponse('Not authenticated', null));
            return;
        }

        // Fetch the full user data from the database
        const fullUser = await User.findById(user._id);

        // If no user is found, respond with 404
        if(!fullUser) {
            res.status(404).json(errorResponse('User not found', null));
            return;
        }

        // Return user data
        res.status(200).json(successResponse('User fetched!', fullUser));

    } catch (error) {
        res.status(500).json(errorResponse('Couldnt find or fetch the user', error));
        return;
    }
};
