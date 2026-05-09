import express from 'express';
import { getDoctors, getPatients, getUserById } from '../controllers/userController.js';
import { protect } from '../Auth/auth.js';

const router = express.Router();

router.get('/patients', protect, getPatients);
router.get('/doctors', protect, getDoctors);
router.get('/:id', protect, getUserById);

export default router;