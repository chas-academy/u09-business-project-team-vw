import mongoose from 'mongoose';
import { UserData } from '../../interfaces/User/UserData';

const { Schema } = mongoose;

// UserData to be stored and connected to saved Recipelist
const userSchema = new Schema<UserData>({
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    displayName: { type: String, default: '' },
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }, 
});

export const User = mongoose.model<UserData>('User', userSchema);