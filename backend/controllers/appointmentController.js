const Appointment = require('../models/appointmentModel');

// @desc    Book an appointment
// @route   POST /api/appointments
// @access  Private (Patient)
const bookAppointment = async (req, res) => {
  const { doctor, date, time } = req.body;

  if (!doctor || !date || !time) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const appointment = await Appointment.create({
    patient: req.user._id,
    doctor,
    date,
    time,
  });

  res.status(201).json(appointment);
};

// @desc    Get patient’s appointments
// @route   GET /api/appointments/mine
// @access  Private (Patient)
const getMyAppointments = async (req, res) => {
  const appointments = await Appointment.find({ patient: req.user._id }).populate('doctor', 'name email');
  res.json(appointments);
};

// @desc    Get doctor’s appointments
// @route   GET /api/appointments/doctor
// @access  Private (Doctor)
const getDoctorAppointments = async (req, res) => {
  const appointments = await Appointment.find({ doctor: req.user._id }).populate('patient', 'name email');
  res.json(appointments);
};

// @desc    Get all appointments (Admin only)
// @route   GET /api/appointments
// @access  Private (Admin)
const getAllAppointments = async (req, res) => {
  const appointments = await Appointment.find().populate('patient doctor', 'name email');
  res.json(appointments);
};

module.exports = {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  getAllAppointments,
};
