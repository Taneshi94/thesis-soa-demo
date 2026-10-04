const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { authenticateToken, requireRole } = require('../middlewares/authMiddleware');

const router = express.Router();

const createServiceProxy = (targetUrl, routePath) => createProxyMiddleware({
  target: targetUrl,
  changeOrigin: true,
  pathRewrite: {
    [`^/api/${routePath}`]: `/${routePath}`
  },
  onProxyReq: (proxyReq, req) => {
    if (req.user) {
      proxyReq.setHeader('x-user-id', req.user.id);
      proxyReq.setHeader('x-user-role', req.user.role);
    }
  },
  onError: (err, req, res) => {
    res.status(503).json({
      success: false,
      statusCode: 503,
      message: `Dịch vụ ${routePath}-service hiện không khả dụng`,
      error: err.message
    });
  }
});

router.use('/students', authenticateToken, createServiceProxy('http://localhost:3001', 'students'));
router.use('/topics', authenticateToken, createServiceProxy('http://localhost:3002', 'topics'));
router.use('/registrations', authenticateToken, requireRole('SINHVIEN'), createServiceProxy('http://localhost:3003', 'registrations'));

module.exports = router;