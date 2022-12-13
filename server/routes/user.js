//localhost:5000/users

import express from 'express';
import {
  getAllUsers,
  followUser,
  updateProfile,
} from '../controllers/users.js';
import { upload, authenticate } from '../middleware/index.js';

const router = express.Router();

router.get('/', authenticate, getAllUsers);
router.patch('/followUser', authenticate, followUser);
router.patch(
  '/:id',
  upload.single('selectedFile'),
  authenticate,
  updateProfile,
);

export default router;
