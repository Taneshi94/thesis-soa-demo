const express = require('express');
const router = express.Router();
const TopicController = require('../controllers/topicController');

// 1. Lấy danh sách tất cả đề tài
router.get('/', TopicController.getAll);

// 2. Lấy thông tin chi tiết đề tài theo mã
router.get('/:maDeTai', TopicController.getByMaDeTai);

// 3. Tạo mới đề tài
router.post('/', TopicController.create);

// 4. Cập nhật toàn bộ thông tin đề tài
router.put('/:maDeTai', TopicController.update);

// 5. Cập nhật riêng trạng thái đề tài (Phục vụ cho Registration Service gọi tới)
router.patch('/:maDeTai/status', TopicController.updateStatus);

// 6. Xóa đề tài theo mã
router.delete('/:maDeTai', TopicController.delete);

module.exports = router;