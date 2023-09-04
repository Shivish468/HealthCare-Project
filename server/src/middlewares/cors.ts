import { Request, Response, NextFunction } from 'express';

const origin = process.env.FRONTEND_URI || '*';

// Define a middleware function for CORS handling
const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', origin); // Replace '*' with your allowed origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
};

export default corsMiddleware;
