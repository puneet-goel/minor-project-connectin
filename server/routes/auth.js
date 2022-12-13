//localhost:5000/auth

import express from 'express';
import {
  login,
  signup,
  resetPassword,
  forgot,
  authenticate,
} from '../controllers/auth.js';

const router = express.Router();

router.post('/authenticate', authenticate);
router.post('/login', login);
router.post('/signup', signup);
router.post('/reset-password', resetPassword);
router.post('/forgot', forgot);

export default router;
