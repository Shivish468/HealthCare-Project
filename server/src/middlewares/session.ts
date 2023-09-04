import session from 'express-session';
import { Request, Response, NextFunction } from 'express';

// Configure and use express-session middleware
export const sessionMiddleware = session({
  secret: 'Shivish', // Replace with a strong, secret key
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000, // Session expiration time (in milliseconds)
    secure: false, // Set to true in a production environment with HTTPS
  },
});

// Create a middleware function to check session authentication
export const checkSessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.user) {
    // User is authenticated
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
