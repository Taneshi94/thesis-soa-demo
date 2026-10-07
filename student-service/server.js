const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const { errorHandler } = require('./errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

// 1. Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Health check route (Cho Gateway / Monitor kiểm tra)
app.get('/', (req, res) => {
  res.status(200).json({ service: 'Student Service', status: 'ONLINE' });
});
app.get('/health', (req, res) => {
  res.status(200).json({ service: 'Student Service', status: 'ONLINE' });
});

// 3. Service routes
app.use('/api/students', studentRoutes);

// 4. Centralized Error Handler (Đặt cuối cùng)
app.use(errorHandler);

// 5. Start Server
app.listen(PORT, () => {
  console.log(`Student Service running on port ${PORT}`);
});