import express from 'express';
import { getUserProfile, updateUserProfile } from '../../controllers/userController.js';
import { checkSessionMiddleware, sessionMiddleware } from '../../middlewares/session.js';

const router = express.Router();

// Get user profile (protected route)
router.get('/profile',sessionMiddleware , getUserProfile);

// Update user profile (protected route)
router.put('/profile', checkSessionMiddleware, updateUserProfile);

export default router;
