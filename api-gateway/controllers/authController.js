const AuthService = require('../services/authService');
const { asyncHandler } = require('../errorHandler');

exports.login = asyncHandler(async (req, res) => {
  // req.body đóng vai trò là LoginDTO { username, password }
  const result = await AuthService.login(req.body);
  res.json(result);
});