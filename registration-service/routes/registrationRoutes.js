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

// 5. Xóa phiếu đăng ký theo mã
router.delete('/:maDangKy', RegistrationController.delete);

// 6. API Đồng bộ tên (Sinh viên / Đề tài) từ các service khác
router.patch('/sync-student/:mssv', RegistrationController.syncStudent);
router.patch('/sync-topic/:maDeTai', RegistrationController.syncTopic);

// 7. API Cascade Delete (Xóa phiếu đăng ký khi SV hoặc Đề tài bị xóa)
router.delete('/by-student/:mssv', RegistrationController.syncDeleteByStudent);
router.delete('/by-topic/:maDeTai', RegistrationController.syncDeleteByTopic);

module.exports = router;