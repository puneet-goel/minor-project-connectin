//localhost:5000/posts

import express from 'express';
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getUserPost,
} from '../controllers/posts.js';
import { upload, authenticate } from '../middleware/index.js';

const router = express.Router();

router.get('/', authenticate, getPosts);
router.get('/:id', getUserPost);
router.post('/', upload.single('selectedFile'), authenticate, createPost);
router.patch('/:id', upload.single('selectedFile'), authenticate, updatePost);
router.delete('/:id', authenticate, deletePost);
router.patch('/:id/likePost', authenticate, likePost);

export default router;
