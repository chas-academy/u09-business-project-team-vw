import mongoose, { ObjectId } from 'mongoose';

export interface UserData extends mongoose.Document {
    _id: string;
    googleId: string;
    email: string;
    name: string;
    createdAt: Date;
    isAdmin: boolean;
    recipeLists: ObjectId[];
}