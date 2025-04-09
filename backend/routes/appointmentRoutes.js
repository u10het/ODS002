import express from 'express';
import {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  getAllAppointments,
  updateAppointmentStatus,
} from '../controllers/appointmentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin, doctor } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Patient books an appointment
router.post('/', protect, bookAppointment);

// Patient views their own appointments
router.get('/mine', protect, getMyAppointments);

// Doctor views their appointments
router.get('/doctor', protect, doctor, getDoctorAppointments);

// Admin views all appointments
router.get('/', protect, admin, getAllAppointments);

// Doctor updates appointment status (accept/reject)
router.put('/:id/status', protect, doctor, updateAppointmentStatus);

export default router;
