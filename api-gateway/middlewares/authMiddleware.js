const jwt = require('jsonwebtoken');
const { AppError } = require('../errorHandler');

const JWT_SECRET = 'thesis_soa_secret_key_2026';

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next(new AppError('Vui lòng cung cấp Token xác thực (Authorization: Bearer <TOKEN>)', 401));
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return next(new AppError('Token không hợp lệ hoặc đã hết hạn', 403));
    }
    req.user = user;
    next();
  });
};

exports.requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(new AppError('Bạn không có quyền truy cập vào tài nguyên này', 403));
    }
    next();
  };
};