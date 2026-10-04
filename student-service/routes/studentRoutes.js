const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/studentController');

// GET /api/students - Lấy danh sách tất cả sinh viên
router.get('/', StudentController.getAll);

// GET /api/students/:mssv - Lấy sinh viên theo MSSV
router.get('/:mssv', StudentController.getByMssv);

// POST /api/students - Tạo sinh viên mới
router.post('/', StudentController.create);

// PUT /api/students/:mssv - Cập nhật thông tin sinh viên
router.put('/:mssv', StudentController.update);

// DELETE /api/students/:mssv - Xóa sinh viên
router.delete('/:mssv', StudentController.delete);

module.exports = router;