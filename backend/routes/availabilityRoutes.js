import express from 'express';
const router = express.Router();
import { setAvailability, getAvailableSlots } from '../controllers/availabilityController.js';
import { protect, doctorOnly } from '../middleware/authMiddleware.js';

router.post('/', protect, doctorOnly, setAvailability);
router.get('/', getAvailableSlots); // Public – no auth required

export default router;
