import express from 'express';
import { registerUser, loginUser, getDoctors } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { getUserById } from '../controllers/userController.js';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Example: Protected user dashboard route
router.get('/dashboard', protect, (req, res) => {
  res.json({ message: `Welcome ${req.user.name}` });
});

// 🔥 New route to get all doctors
router.get('/doctors', protect, getDoctors);

router.get('/:id', protect, getUserById);

export default router;
