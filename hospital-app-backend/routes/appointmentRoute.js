import express from 'express';
import { bookAppointment, cancelAppointment, getAppointments, getAppointmentById } from '../controllers/appointmentController.js';
import { protect } from '../Auth/auth.js';

const router = express.Router();

router.post('/', protect, bookAppointment);
router.get('/', protect, getAppointments);
router.get('/:id', protect, getAppointmentById);
router.put('/:id/cancel', protect, cancelAppointment);

export default router;