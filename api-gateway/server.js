const express = require('express');
const serviceRegistry = require('./config/serviceRegistry');
const proxyRoutes = require('./routes/proxyRoutes');

const app = express();
const PORT = 3000; // Cố định Port 3000, không sử dụng dotenv

app.use(express.json());

// Tự động kiểm tra trạng thái hoạt động (ONLINE/OFFLINE) của các Microservices
async function checkServicesHealth() {
  for (const service of Object.values(serviceRegistry)) {
    try {
      const response = await fetch(service.healthUrl, {
        method: 'GET',
        signal: AbortSignal.timeout(1500) // Timeout 1.5 giây
      });
      service.status = response.ok ? 'ONLINE' : 'DEGRADED';
    } catch {
      service.status = 'OFFLINE';
    }
  }
}

// Chạy kiểm tra ngay khi khởi tạo và quét định kỳ mỗi 15 giây
checkServicesHealth();
setInterval(checkServicesHealth, 15000);

// Nối router điều hướng vào ứng dụng
app.use('/', proxyRoutes);

app.listen(PORT, () => {
  console.log(`[API Gateway] Server đang chạy tại http://localhost:${PORT}`);
  console.log(`[API Gateway] Xem danh sách API tại http://localhost:${PORT}/`);
});