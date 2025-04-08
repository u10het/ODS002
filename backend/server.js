const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const appointmentRoutes = require('./routes/appointmentRoutes');


dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// Test Route
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use('/api/users', require('./routes/userRoutes'));


// Routes
app.use('/api/users', require('./routes/userRoutes'));
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
