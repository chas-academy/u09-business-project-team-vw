import dotenv from 'dotenv';
import { handleError } from './errorHandler';

dotenv.config();

// Google Auth from .env and define type as string.
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
const GOOGLE_CLIENT_URL = process.env.GOOGLE_CLIENT_URL as string;

// Ensure no variable is missing
if(!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_CLIENT_URL) {
    const error = new Error('Google Auth is missing a credential');
    handleError(error, 'configGoogle.ts');
    process.exit(1);
}

// Exports the variables
export {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_CLIENT_URL
};