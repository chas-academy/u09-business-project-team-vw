import mongoose from 'mongoose';

export interface UserData extends mongoose.Document {
    _id: string;
    googleId: string;
    email: string;
    name: string;
    createdAt: Date;
    isAdmin: Boolean;
}
