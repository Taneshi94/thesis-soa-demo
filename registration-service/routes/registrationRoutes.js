const express = require('express');
const router = express.Router();
const RegistrationController = require('../controllers/registrationController');

// 1. Lấy danh sách tất cả phiếu đăng ký
router.get('/', RegistrationController.getAll);

// 2. Lấy chi tiết phiếu đăng ký theo mã
router.get('/:maDangKy', RegistrationController.getByMaDangKy);

// 3. Đăng ký đề tài mới
router.post('/', RegistrationController.create);

// 4. Cập nhật thông tin phiếu đăng ký
router.put('/:maDangKy', RegistrationController.update);

// 5. Xóa phiếu đăng ký
router.delete('/:maDangKy', RegistrationController.delete);

// 6. Route đồng bộ dữ liệu từ các service khác
router.patch('/sync-student/:mssv', RegistrationController.syncStudent);
router.patch('/sync-topic/:maDeTai', RegistrationController.syncTopic);

module.exports = router;