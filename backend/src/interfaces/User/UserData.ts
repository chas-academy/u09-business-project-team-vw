import mongoose from 'mongoose';

export interface UserData extends mongoose.Document {
    googleId: string;
    email: string;
    name: string;
    createdAt: Date;
    isAdmin: Boolean;
}
