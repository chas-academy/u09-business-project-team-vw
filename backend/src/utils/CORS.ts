<<<<<<< HEAD
import { CorsOptions } from 'cors';

const allowedOrigins = [
  'http://localhost:3000', 
  'http://localhost:5173', 
  'http://localhost:4173',
  'https://u09-business-project-team-vw.onrender.com',
  'https://u09-team-vw.netlify.app'
];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
=======
const allowedOrigins = [
  'http://localhost:3000', 
  'http://localhost:5173', 
  'https://u09-business-project-team-vw.onrender.com/auth/google/callback',
  'http://localhost:4173',
  'https://u09-team-vw.netlify.app'
];

export const corsOptions = {
  origin: allowedOrigins,
>>>>>>> c684264cd8fa1300f2f640949d8ff5148a135a71
  credentials: true,
};