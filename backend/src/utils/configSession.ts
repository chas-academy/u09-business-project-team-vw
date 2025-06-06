import session from 'express-session';
import MongoStore from 'connect-mongo'
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
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000
    },
});