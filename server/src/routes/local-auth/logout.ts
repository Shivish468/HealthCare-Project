import {Router} from 'express';
import { logout } from '../../controllers/authController.js';

const router = Router();

// User login
router.post('/logout', logout);

export default router;
