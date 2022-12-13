//localhost:5000/trends

import express from 'express';
import { getSpecificTrendImage } from '../controllers/trends.js';
import { authenticate } from '../middleware/index.js';

const router = express.Router();

router.get('/', authenticate, getSpecificTrendImage);

export default router;
