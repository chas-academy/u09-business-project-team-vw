// PASSPORT + GOOGLE STRATEGY
import passport from 'passport';
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20';

// FILES FROM UTILS FOLDER
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_URL } from '../utils/configGoogle';
import { handleError } from '../utils/errorHandler';

// FILES FROM MODELS + TYPES
import { User } from '../models/User/UserModel';
import { UserData } from '../interfaces/User/UserData';

// Configure google auth strategy
export const setupGoogleStrategy = () => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                callbackURL: GOOGLE_CLIENT_URL, // <-- URL Google will redirect to after login
            },

            // callback runs after google checks and validates the user
            async (
                accessToken: string, 
                refreshToken: string, 
                profile: Profile, 
                done: VerifyCallback 
                ): Promise<void> => {
                
                    try {
                    // Check if the user exists in our database.
                    const existingUser = await User.findOne({ googleId: profile.id });

                    // If user exists, login
                    if(existingUser) return done(null, existingUser);

                    // Create a new user.
                    const newUser = await User.create({
                        googleId: profile.id,
                        email: profile.emails?.[0].value,
                        name: profile.displayName
                    });

                    // pass new user to passport
                    return done(null, newUser);
                } catch(error) {
                    handleError(error, 'passport.ts');
                }
            }
        )
    );


    // Serialize user: called when saving user data into the session (or creating a token)
    passport.serializeUser((user: typeof User.prototype, done: (err: Error | null, id?: string) => void): void => {
        done(null, user.id.toString()); // <-- Saving the user.id to our database.
    });

    // Deserialize user: called on each request to retrieve full user from session/token
    passport.deserializeUser(async (id: string, done: (err: Error | null, user?: UserData | null) => void): Promise<void> => {
        try {
            const user = await User.findById(id); // <-- Find the user in the database.
            done(null, user); // <-- get the entire user object.
        } catch(error) {
            done(error as Error, null)
        }
    });
};