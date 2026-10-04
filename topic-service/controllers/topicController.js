const TopicService = require('../services/topicService');
const { AppError } = require('../errorHandler');

class TopicController {
  /**
   * Lấy danh sách tất cả đề tài
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static getAll(req, res) {
    try {
      const topics = TopicService.getAllTopics();
      return res.status(200).json({ success: true, data: topics });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message = error instanceof Error ? error.message : 'Lỗi khi lấy danh sách đề tài';
      return res.status(statusCode).json({ success: false, message });
    }
  }

  /**
   * Lấy thông tin chi tiết đề tài theo mã
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static getByMaDeTai(req, res) {
    try {
      const maDeTai = String(req.params.maDeTai); // Khắc phục ts(2345)
      const topic = TopicService.getTopicByMaDeTai(maDeTai);
      return res.status(200).json({ success: true, data: topic });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 404;
      const message = error instanceof Error ? error.message : 'Không tìm thấy đề tài';
      return res.status(statusCode).json({ success: false, message });
    }
  }

  /**
   * Tạo mới đề tài
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static create(req, res) {
    try {
      const newTopic = TopicService.createTopic(req.body);
      return res.status(201).json({ success: true, data: newTopic });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 400;
      const message = error instanceof Error ? error.message : 'Lỗi khi tạo đề tài';
      return res.status(statusCode).json({ success: false, message });
    }
  }

  /**
   * Cập nhật toàn bộ thông tin đề tài
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static update(req, res) {
    try {
      const maDeTai = String(req.params.maDeTai); // Khắc phục ts(2345)
      const updated = TopicService.updateTopic(maDeTai, req.body);
      return res.status(200).json({ success: true, data: updated });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 400;
      const message = error instanceof Error ? error.message : 'Lỗi khi cập nhật đề tài';
      return res.status(statusCode).json({ success: false, message });
    }
  }

  /**
   * Cập nhật riêng trạng thái đề tài (Dành cho Registration Service hoặc Admin)
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static updateStatus(req, res) {
    try {
      const maDeTai = String(req.params.maDeTai); // Khắc phục ts(2345)
      const updated = TopicService.updateTopicStatus(maDeTai, req.body);
      return res.status(200).json({ success: true, data: updated });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 400;
      const message = error instanceof Error ? error.message : 'Lỗi khi cập nhật trạng thái đề tài';
      return res.status(statusCode).json({ success: false, message });
    }
  }

  /**
   * Xóa đề tài theo mã
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static delete(req, res) {
    try {
      const maDeTai = String(req.params.maDeTai); // Khắc phục ts(2345)
      TopicService.deleteTopic(maDeTai);
      return res.status(200).json({ success: true, message: `Đã xóa đề tài ${maDeTai}` });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 400;
      const message = error instanceof Error ? error.message : 'Lỗi khi xóa đề tài';
      return res.status(statusCode).json({ success: false, message });
    }
  }
}

module.exports = TopicController;