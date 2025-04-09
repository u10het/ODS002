import Availability from '../models/availabilityModel.js';

// POST /api/availability → set available time slots
export const setAvailability = async (req, res) => {
  const { date, slots } = req.body;
  const doctorId = req.user._id;

  if (!date || !slots || slots.length === 0) {
    return res.status(400).json({ message: 'Date and slots are required' });
  }

  let availability = await Availability.findOne({ doctor: doctorId, date: new Date(date) });

  if (availability) {
    availability.slots = slots;
  } else {
    availability = new Availability({ doctor: doctorId, date: new Date(date), slots });
  }

  await availability.save();
  res.status(200).json({ message: 'Availability set successfully' });
};

// GET /api/availability?doctorId=...&date=... → get slots for patients
export const getAvailableSlots = async (req, res) => {
  const { doctorId, date } = req.query;

  if (!doctorId || !date) {
    return res.status(400).json({ message: 'Doctor ID and date are required' });
  }

  const availability = await Availability.findOne({
    doctor: doctorId,
    date: new Date(date),
  });

  if (!availability) {
    return res.json({ availableSlots: [] });
  }

  res.json({ availableSlots: availability.slots });
};
