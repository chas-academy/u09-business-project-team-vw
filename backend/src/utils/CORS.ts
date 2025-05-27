const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];

export const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};