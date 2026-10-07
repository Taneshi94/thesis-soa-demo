const TopicService = require('../services/topicService');
const { asyncHandler } = require('../errorHandler');

class TopicController {
  /**
   * 1. Lấy danh sách tất cả đề tài
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static getAll = asyncHandler(async (req, res) => {
    const topics = TopicService.getAllTopics();
    res.status(200).json({
      success: true,
      data: topics
    });
  });

  /**
   * 2. Lấy thông tin chi tiết đề tài theo mã
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static getByMaDeTai = asyncHandler(async (req, res) => {
    const maDeTai = String(req.params.maDeTai);
    const topic = TopicService.getTopicByMaDeTai(maDeTai);
    res.status(200).json({
      success: true,
      data: topic
    });
  });

  /**
   * 3. Tạo mới đề tài
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static create = asyncHandler(async (req, res) => {
    const newTopic = TopicService.createTopic(req.body);
    res.status(201).json({
      success: true,
      data: newTopic
    });
  });

  /**
   * 4. Cập nhật toàn bộ thông tin đề tài (Đồng bộ tên đề tài qua API Gateway)
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static update = asyncHandler(async (req, res) => {
    const maDeTai = String(req.params.maDeTai);
    // Bắt buộc có await vì TopicService.updateTopic là hàm async gửi HTTP request đến API Gateway
    const updated = await TopicService.updateTopic(maDeTai, req.body);
    res.status(200).json({
      success: true,
      data: updated
    });
  });

  /**
   * 5. Cập nhật riêng trạng thái đề tài (Dành cho Registration Service hoặc Admin)
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static updateStatus = asyncHandler(async (req, res) => {
    const maDeTai = String(req.params.maDeTai);
    const updated = await TopicService.updateTopicStatus(maDeTai, req.body);
    res.status(200).json({
      success: true,
      data: updated
    });
  });

  /**
   * 6. Xóa đề tài theo mã (Đồng bộ xóa phiếu đăng ký liên quan qua API Gateway)
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static delete = asyncHandler(async (req, res) => {
    const maDeTai = String(req.params.maDeTai);
    // Bắt buộc có await vì TopicService.deleteTopic là hàm async gửi HTTP DELETE đến API Gateway
    await TopicService.deleteTopic(maDeTai);
    res.status(200).json({
      success: true,
      message: `Đã xóa đề tài ${maDeTai}`
    });
  });
}

module.exports = TopicController;