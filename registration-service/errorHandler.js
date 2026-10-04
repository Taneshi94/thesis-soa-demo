class AppError extends Error {
  /**
   * @param {string} message 
   * @param {number} statusCode 
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Hàm bọc async controller để không cần dùng try-catch thủ công
 * @param {Function} fn 
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Middleware xử lý lỗi tập trung
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Lỗi hệ thống nội bộ';

  res.status(statusCode).json({
    success: false,
    message
  });
};

module.exports = {
  AppError,
  asyncHandler,
  errorHandler
};