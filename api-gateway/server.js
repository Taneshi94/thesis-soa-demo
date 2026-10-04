const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const { errorHandler } = require('./errorHandler');

const app = express();
const PORT = 3000;

app.use(cors());

async function startServer() {
  // Nạp động ESM module trong môi trường CommonJS
  const { createProxyMiddleware } = await import('http-proxy-middleware');

  // 1. Health check endpoint cho Gateway (Test trực tiếp trên web http://localhost:3000/)
  app.get('/', (req, res) => {
    res.json({
      success: true,
      message: 'API Gateway đang chạy thành công!',
      endpoints: {
        students: 'http://localhost:3000/students',
        topics: 'http://localhost:3000/topics',
        registrations: 'http://localhost:3000/registrations'
      }
    });
  });

  // 2. Proxy sang Student Service
  app.use('/students', createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true
  }));

  // 3. Proxy sang Topic Service
  app.use('/topics', createProxyMiddleware({
    target: 'http://localhost:3002',
    changeOrigin: true
  }));

  // 4. Proxy sang Registration Service
  app.use('/registrations', createProxyMiddleware({
    target: 'http://localhost:3003',
    changeOrigin: true
  }));

  // Middlewares & Routes nội bộ cho Gateway (Auth)
  app.use(express.json());
  app.use('/auth', authRoutes);

  // Centralized Error Handler
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
  });
}

startServer();