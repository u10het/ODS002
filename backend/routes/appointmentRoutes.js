const express = require('express');
const router = express.Router();
const {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  getAllAppointments,
} = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

// Patient routes
router.post('/', protect, bookAppointment); // book an appointment
router.get('/mine', protect, getMyAppointments); // view patient’s appointments

// Doctor route
router.get('/doctor', protect, getDoctorAppointments); // view doctor’s appointments

// Admin route
router.get('/', protect, getAllAppointments); // admin only — in real case, check for admin role

module.exports = router;
