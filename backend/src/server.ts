import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// UTILS
import { MONGODB_URI, PORT } from './utils/config';
import { handleError } from './utils/errorHandler';

// ROUTES
import authRouter from './routes/authRoutes';

// AUTH
import { setupGoogleStrategy } from './auth/googleAuth';


// Load .env file
dotenv.config();

// Load googleauth file
setupGoogleStrategy();

// Define app as Application object
const app: Application = express(); 

// MAKE THE CONNECTION
app.use(express.json());

app.use('/auth', authRouter);

// Use PORT and MONGODB_URI to connect to the database
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected successfully!');
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        });
    })
    .catch(error => {
        handleError(error, 'MongoDB Connection');
    });
