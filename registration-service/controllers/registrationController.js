const RegistrationService = require('../services/registrationService');
const { asyncHandler } = require('../errorHandler');

exports.getAllRegistrations = asyncHandler(async (req, res) => {
  const registrations = await RegistrationService.getAllRegistrations();
  res.json({ success: true, data: registrations });
});

exports.registerTopic = asyncHandler(async (req, res) => {
  // req.body đóng vai trò là CreateRegistrationDTO { mssv, maDeTai }
  const registration = await RegistrationService.registerTopic(req.body);
  res.status(201).json({ success: true, message: 'Đăng ký đề tài thành công', data: registration });
});