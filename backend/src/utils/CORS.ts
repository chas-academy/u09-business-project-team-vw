const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173', 'https://u09-business-project-team-vw.onrender.com/auth/google/callback'];

export const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};