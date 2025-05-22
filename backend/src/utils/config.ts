import dotenv from 'dotenv';
import { handleError } from './errorHandler';

dotenv.config();

const API_KEY = process.env.API_KEY;
// EXTERNAL API error handler.
if(!process.env.API_KEY) {
    const error = new Error('API_KEY is missing or invalid');
    handleError(error, 'apiKey.ts');
    process.exit(1);
}

// PORT 
// Fetch PORT from .env file.
const rawPort = process.env.PORT;
const PORT: number = rawPort ? parseInt(rawPort, 10) : 3000 as number;

// Check if PORT is exist and defined
if(isNaN(PORT)) {
    const error = new Error('FAILED - PORT number is not valid or missing');
    handleError(error, 'server.ts');
    process.exit(1);
}


// MONGODB_URI
// Check if URI exist, if not, exit.
if(!process.env.MONGODB_URI) {
    const error = new Error('MONGODB_URI does not exist i root file');
    handleError(error, 'server.ts');
    process.exit(1);
}
// ensure URI is a string.
const MONGODB_URI: string = process.env.MONGODB_URI as string; 


export {
    PORT,
    MONGODB_URI,
    API_KEY // exporting to apiKeys.ts
};