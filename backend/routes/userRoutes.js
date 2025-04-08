const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
// Example: Protect a user dashboard route
router.get('/dashboard', protect, (req, res) => {
    res.json({ message: `Welcome ${req.user.name}` });
  });

module.exports = router;
