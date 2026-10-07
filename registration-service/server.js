const express = require('express');
const cors = require('cors');
const registrationRoutes = require('./routes/registrationRoutes');
const { errorHandler } = require('./errorHandler');

const app = express();
const PORT = process.env.PORT || 3003;

// 1. Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Bổ sung để hỗ trợ parse form-data / urlencoded nếu có

// 2. Health check route (Phục vụ API Gateway / Monitor)
app.get('/', (req, res) => {
  res.status(200).json({ service: 'Registration Service', status: 'ONLINE' });
});
app.get('/health', (req, res) => {
  res.status(200).json({ service: 'Registration Service', status: 'ONLINE' });
});

// 3. Service routes
app.use('/api/registrations', registrationRoutes);

// 4. Centralized Error Handler
app.use(errorHandler);

// 5. Start Server
app.listen(PORT, () => {
  console.log(`Registration Service running on port ${PORT}`);
});