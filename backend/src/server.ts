
// FUNDAMENTALS
import express, { Application } from 'express';
import mongoose from 'mongoose';

// CORS
import cors from 'cors';
import { corsOptions } from './middleware/corsOptions';

// UTILS
import { MONGODB_URI, PORT } from './utils/config';
import { handleError } from './utils/errorHandler';

// ROUTES
import authRouter from './routes/authRoutes';

// AUTH
import { setupGoogleStrategy } from './auth/googleAuth';



// Load googleauth file
setupGoogleStrategy();

// Define app as Application object
const app: Application = express();

// Check CORS access for user
app.use(cors(corsOptions));

// MAKE THE CONNECTION
app.use(express.json());

app.use('/auth', authRouter);

// Use PORT and MONGODB_URI to connect to the database
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('SUCCESS: MongoDB Connected');
        app.listen(PORT, () => {
            console.log(`SUCCESS: Server is Running on port: ${PORT}`);
        });
    })
    .catch((error: unknown) => {
        handleError(error, 'MongoDB Connection');
    });
