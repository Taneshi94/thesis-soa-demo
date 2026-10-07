const express = require('express');
const proxy = require('express-http-proxy');
const serviceRegistry = require('../config/serviceRegistry');

const router = express.Router();

// 1. SERVICE CATALOG:
router.get('/', (req, res) => {
  const catalog = Object.entries(serviceRegistry).map(([key, service]) => ({
    serviceKey: key,
    serviceName: service.name,
    gatewayUrl: `http://localhost:3000/api/${key}`, // Chỉ hiện URL Gateway Port 3000
    status: service.status,
    description: service.description,
    availableEndpoints: service.endpoints
  }));

  return res.status(200).json({
    system: 'SOA Thesis API Gateway',
    status: 'Active',
    totalServices: catalog.length,
    services: catalog
  });
});

// 2. DYNAMIC ROUTE RESOLVER:
router.use('/api/:serviceName', (req, res, next) => {
  const { serviceName } = req.params;
  const targetService = serviceRegistry[serviceName];

  if (!targetService) {
    return res.status(404).json({
      success: false,
      message: `Không tìm thấy dịch vụ tương ứng với đường dẫn '/api/${serviceName}'`
    });
  }

  if (targetService.status === 'OFFLINE') {
    return res.status(503).json({
      success: false,
      message: `Dịch vụ '${targetService.name}' hiện đang ngoại tuyến (OFFLINE). Vui lòng thử lại sau!`
    });
  }

  // Chuyển tiếp Request và giữ nguyên exact URL gốc
  return proxy(targetService.target, {
    proxyReqPathResolver: (req) => req.originalUrl,
    
    // Bổ sung xử lý lỗi kết nối khi Microservice rớt đột ngột
    proxyErrorHandler: (err, res, next) => {
      console.error(`[Proxy Error - ${targetService.name}]:`, err.message);
      return res.status(502).json({
        success: false,
        message: `Lỗi kết nối tới dịch vụ '${targetService.name}' (Bad Gateway).`
      });
    }
  })(req, res, next);
});

module.exports = router;