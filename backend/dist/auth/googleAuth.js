"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupGoogleStrategy = void 0;
// PASSPORT + GOOGLE STRATEGY
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
// FILES FROM UTILS FOLDER
const configGoogle_1 = require("../utils/configGoogle");
const errorHandler_1 = require("../utils/errorHandler");
// FILES FROM MODELS + TYPES
const UserModel_1 = require("../models/User/UserModel");
// Configure google auth strategy
const setupGoogleStrategy = () => {
    passport_1.default.use(new passport_google_oauth20_1.Strategy({
        clientID: configGoogle_1.GOOGLE_CLIENT_ID,
        clientSecret: configGoogle_1.GOOGLE_CLIENT_SECRET,
        callbackURL: configGoogle_1.GOOGLE_CLIENT_URL, // <-- URL Google will redirect to after login
    }, 
    // callback runs after google checks and validates the user
    async (accessToken, refreshToken, profile, done) => {
        try {
            // Check if the user exists in our database.
            const existingUser = await UserModel_1.User.findOne({ googleId: profile.id });
            // If user exists, login
            if (existingUser)
                return done(null, existingUser);
            // Create a new user.
            const newUser = await UserModel_1.User.create({
                googleId: profile.id,
                email: profile.emails?.[0].value,
                name: profile.displayName
            });
            // pass new user to passport
            return done(null, newUser);
        }
        catch (error) {
            (0, errorHandler_1.handleError)(error, 'passport.ts');
        }
    }));
    // Serialize user: called when saving user data into the session (or creating a token)
    passport_1.default.serializeUser((user, done) => {
        done(null, user.id.toString()); // <-- Saving the user.id to our database.
    });
    // Deserialize user: called on each request to retrieve full user from session/token
    passport_1.default.deserializeUser(async (id, done) => {
        try {
            const user = await UserModel_1.User.findById(id); // <-- Find the user in the database.
            done(null, user); // <-- get the entire user object.
        }
        catch (error) {
            done(error, null);
        }
    });
};
exports.setupGoogleStrategy = setupGoogleStrategy;
