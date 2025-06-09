
// FUNDAMENTALS
import express, { Application } from 'express';
import mongoose from 'mongoose';

// CORS
import cors from 'cors';
import { corsOptions } from './utils/CORS';

// UTILS
import { MONGODB_URI, PORT } from './utils/config';
import { handleError } from './utils/errorHandler';
import { sessionConfig } from './utils/configSession';


// ROUTES
import authRouter from './routes/authRoutes';
import userRouter from './routes/userRoutes';
import adminRouter from './routes/adminRoutes';
<<<<<<< HEAD
import recipeRouter from './routes/allRecipesRoutes';
import recipeListRouter from './routes/recipeListRoutes';
=======

import recipeRouter from './routes/allRecipesRoutes';
>>>>>>> c684264cd8fa1300f2f640949d8ff5148a135a71

// AUTH
import { setupGoogleStrategy } from './auth/googleAuth';
import passport from 'passport';



<<<<<<< HEAD
=======


>>>>>>> c684264cd8fa1300f2f640949d8ff5148a135a71
// Define app as Application object
const app: Application = express();

// Check CORS access for user
app.use(cors(corsOptions));


// MAKE THE CONNECTION
app.use(express.json());

// Load googleauth file
setupGoogleStrategy();

// Passport, Google Auth Session
<<<<<<< HEAD
app.set('trust proxy', 1);
=======
>>>>>>> c684264cd8fa1300f2f640949d8ff5148a135a71
app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());



// ROUTES
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/recipes', recipeRouter);
<<<<<<< HEAD
app.use('/recipesList', recipeListRouter);
=======
>>>>>>> c684264cd8fa1300f2f640949d8ff5148a135a71

// STANDARD ROUTE FOR BACKEND
app.get('/', (req, res) => {
    res.send('API IS RUNNING!');
});

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
