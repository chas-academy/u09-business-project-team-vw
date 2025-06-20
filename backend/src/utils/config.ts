import dotenv from 'dotenv';
import { handleError } from './errorHandler';

dotenv.config();

const API_KEY = process.env.API_KEY;
// EXTERNAL API error handler.
if(!process.env.API_KEY) {
    const error = new Error('API_KEY is missing or invalid');
    handleError(error, 'config.ts');
    process.exit(1);
}

// PORT 
// Fetch PORT from .env file.
const rawPort = process.env.PORT as string;
const PORT: number = rawPort ? parseInt(rawPort, 10) : 3000 as number;

// Check if PORT is exist and defined
if(isNaN(PORT)) {
    const error = new Error('FAILED - PORT number is not valid or missing');
    handleError(error, 'config.ts');
    process.exit(1);
}


// MONGODB_URI
// Check if URI exist, if not, exit.
if(!process.env.MONGODB_URI) {
    const error = new Error('MONGODB_URI does not exist i root file');
    handleError(error, 'config.ts');
    process.exit(1);
}
// ensure URI is a string.
const MONGODB_URI: string = process.env.MONGODB_URI as string; 


const SESSION_SECRET = process.env.SESSION_SECRET as string;
if(!SESSION_SECRET) {
    const error = new Error('SESSION_SECRET is missing in env variables.');
    handleError(error, 'config.ts');
    process.exit(1);
}


export {
    PORT, // exporting to server.ts
    MONGODB_URI, // exporting to server.ts
    API_KEY, // exporting to apiKeys.ts
    SESSION_SECRET // exporting to configSession.ts
};