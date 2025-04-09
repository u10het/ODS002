import Appointment from '../models/appointmentModel.js';

// Book an appointment
export const bookAppointment = async (req, res) => {
  const { doctor, date, time } = req.body;

  if (!doctor || !date || !time) {
    return res.status(400).json({ message: 'Doctor, date, and time are required' });
  }

  try {
    const appointment = new Appointment({
      patient: req.user._id,
      doctor,
      date: new Date(date),
      time,
      status: 'Pending',
    });

    const createdAppointment = await appointment.save();

    res.status(201).json(createdAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to book appointment', error: error.message });
  }
};

// Update appointment status (accept/reject)
export const updateAppointmentStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!['Accepted', 'Rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  const appointment = await Appointment.findById(id);

  if (!appointment) {
    return res.status(404).json({ message: 'Appointment not found' });
  }

  appointment.status = status;
  await appointment.save();

  res.json({ message: `Appointment ${status.toLowerCase()} successfully`, appointment });
};


// Get all appointments for a doctor
export const getDoctorAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.user._id }).populate('patient', 'name email');

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve appointments', error: error.message });
  }
};



// Get appointments for the logged-in doctor
export const getDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.user._id;

    const appointments = await Appointment.find({ doctor: doctorId }).populate('patient', 'name email');

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve doctor appointments', error: error.message });
  }
};



// Get appointments for the currently logged-in user (patient)
export const getMyAppointments = async (req, res) => {
  try {
    const userId = req.user._id;

    const appointments = await Appointment.find({ patient: userId }).populate('doctor', 'name specialization');

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve your appointments', error: error.message });
  }
};


// Get all appointments (admin only)
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patient', 'name email')
      .populate('doctor', 'name email');

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve all appointments', error: error.message });
  }
};
