const express = require('express');
const cors = require('cors');
const serviceRegistry = require('./config/serviceRegistry');
const proxyRoutes = require('./routes/proxyRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Enable CORS cho Gateway để Client/Frontend gọi được
app.use(cors());

// LƯU Ý: Không dùng express.json() ở đây để tránh nghẽn/mất Stream Body khi qua express-http-proxy

// 2. Kiểm tra trạng thái hoạt động chạy SONG SONG (Promise.allSettled)
async function checkServicesHealth() {
  const healthChecks = Object.values(serviceRegistry).map(async (service) => {
    try {
      const response = await fetch(service.healthUrl, {
        method: 'GET',
        signal: AbortSignal.timeout(1500) // Timeout 1.5 giây
      });
      service.status = response.ok ? 'ONLINE' : 'DEGRADED';
    } catch {
      service.status = 'OFFLINE';
    }
  });

  await Promise.allSettled(healthChecks);
}

// Chạy kiểm tra ngay khi khởi tạo và quét định kỳ mỗi 15 giây
checkServicesHealth();
setInterval(checkServicesHealth, 15000);

// 3. Nối router điều hướng proxy
app.use('/', proxyRoutes);

// 4. Centralized Error Handler cho Gateway
app.use((err, req, res, next) => {
  console.error('[API Gateway Error]:', err.message);
  res.status(500).json({
    success: false,
    message: 'Lỗi xử lý hệ thống tại API Gateway',
    error: err.message
  });
});

app.listen(PORT, () => {
  console.log(`[API Gateway] Server đang chạy tại http://localhost:${PORT}`);
  console.log(`[API Gateway] Xem danh sách API tại http://localhost:${PORT}/`);
});