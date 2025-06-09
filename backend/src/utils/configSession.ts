import session from 'express-session';
<<<<<<< HEAD
import MongoStore from 'connect-mongo';
=======
import MongoStore from 'connect-mongo'
>>>>>>> c684264cd8fa1300f2f640949d8ff5148a135a71
import { SESSION_SECRET, MONGODB_URI } from './config';


export const sessionConfig = session ({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
        mongoUrl: MONGODB_URI,
    }),
    cookie: {
        httpOnly: true,
<<<<<<< HEAD
        secure: true,
        sameSite: 'none',
=======
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
>>>>>>> c684264cd8fa1300f2f640949d8ff5148a135a71
        maxAge: 24 * 60 * 60 * 1000
    },
});