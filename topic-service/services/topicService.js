const ITopicService = require('../interfaces/ITopicService');
const TopicModel = require('../models/topicModel');
const { AppError } = require('../errorHandler');

const GATEWAY_URL = process.env.GATEWAY_URL || 'http://localhost:3000';

/**
 * @typedef {import('../types/topicTypes').TopicEntity} TopicEntity
 * @typedef {import('../types/topicTypes').CreateTopicDTO} CreateTopicDTO
 * @typedef {import('../types/topicTypes').UpdateTopicDTO} UpdateTopicDTO
 * @typedef {import('../types/topicTypes').UpdateTopicStatusDTO} UpdateTopicStatusDTO
 */

/**
 * @implements {ITopicService}
 */
class TopicService extends ITopicService {
  /**
   * 1. Lấy danh sách tất cả đề tài
   * @returns {TopicEntity[]}
   */
  static getAllTopics() {
    return TopicModel.findAll();
  }

  /**
   * 2. Lấy chi tiết đề tài theo mã
   * @param {string} maDeTai
   * @returns {TopicEntity}
   */
  static getTopicByMaDeTai(maDeTai) {
    const topic = TopicModel.findByMaDeTai(maDeTai);
    if (!topic) {
      throw new AppError(`Không tìm thấy đề tài với mã: ${maDeTai}`, 404);
    }
    return topic;
  }

  /**
   * 3. Tạo mới đề tài (Mặc định trangThai = 0: Còn mở)
   * @param {CreateTopicDTO} dto
   * @returns {TopicEntity}
   */
  static createTopic(dto) {
    const existing = TopicModel.findByMaDeTai(dto.maDeTai);
    if (existing) {
      throw new AppError(`Đề tài với mã ${dto.maDeTai} đã tồn tại!`, 400);
    }

    /** @type {TopicEntity} */
    const topicToCreate = {
      maDeTai: dto.maDeTai,
      tenDeTai: dto.tenDeTai,
      moTa: dto.moTa || '',
      giangVienHuongDan: dto.giangVienHuongDan || '',
      trangThai: 0 // 0: Đề tài mới tạo, còn mở (chưa ai đăng ký)
    };

    TopicModel.create(topicToCreate);

    const created = TopicModel.findByMaDeTai(dto.maDeTai);
    if (!created) {
      throw new AppError('Lỗi trong quá trình tạo đề tài', 500);
    }
    return created;
  }

  /**
   * 4. Cập nhật thông tin đề tài & tự động đồng bộ tên sang Registration Service qua Gateway
   * @param {string} maDeTai
   * @param {UpdateTopicDTO} dto
   * @returns {Promise<TopicEntity>}
   */
  static async updateTopic(maDeTai, dto) {
    const existing = this.getTopicByMaDeTai(maDeTai);

    const updatedTopic = {
      tenDeTai: dto.tenDeTai || existing.tenDeTai,
      moTa: dto.moTa !== undefined ? dto.moTa : existing.moTa,
      giangVienHuongDan: dto.giangVienHuongDan !== undefined ? dto.giangVienHuongDan : existing.giangVienHuongDan
    };

    TopicModel.update(maDeTai, updatedTopic);

    const updated = TopicModel.findByMaDeTai(maDeTai);
    if (!updated) {
      throw new AppError('Lỗi trong quá trình cập nhật đề tài', 500);
    }

    // Tự động đồng bộ tên đề tài sang Registration Service qua API Gateway nếu tên bị thay đổi
    if (dto.tenDeTai && dto.tenDeTai !== existing.tenDeTai) {
      try {
        await fetch(`${GATEWAY_URL}/api/registrations/sync-topic/${maDeTai}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tenDeTai: dto.tenDeTai })
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Lỗi đồng bộ đề tài';
        console.error('[TopicService] Lỗi đồng bộ tên đề tài qua Gateway:', message);
      }
    }

    return updated;
  }

  /**
   * 5. Cập nhật riêng trạng thái đề tài (Bất đồng bộ)
   * Quản lý chuyển trạng thái:
   *  0: Còn mở (Chưa ai đăng ký)
   *  1: Đã được đăng ký (Có sinh viên nhận)
   *  2: Đã đóng (Khóa đề tài)
   * @param {string} maDeTai
   * @param {UpdateTopicStatusDTO} dto
   * @returns {Promise<TopicEntity>}
   */
  static async updateTopicStatus(maDeTai, dto) {
    const existing = this.getTopicByMaDeTai(maDeTai);
    const newStatus = Number(dto.trangThai);

    // Kiểm tra tính hợp lệ của giá trị trạng thái
    if (![0, 1, 2].includes(newStatus)) {
      throw new AppError('Trạng thái không hợp lệ (chỉ chấp nhận 0: Mở, 1: Đã đăng ký, 2: Đã đóng)', 400);
    }

    // Không cần cập nhật nếu trạng thái không thay đổi
    if (Number(existing.trangThai) === newStatus) {
      return existing;
    }

    TopicModel.updateStatus(maDeTai, newStatus);

    const updated = TopicModel.findByMaDeTai(maDeTai);
    if (!updated) {
      throw new AppError('Lỗi trong quá trình cập nhật trạng thái đề tài', 500);
    }
    return updated;
  }

  /**
   * 6. Xóa đề tài theo mã & yêu cầu Registration Service xóa các đăng ký liên quan qua Gateway
   * @param {string} maDeTai
   * @returns {Promise<boolean>}
   */
  static async deleteTopic(maDeTai) {
    this.getTopicByMaDeTai(maDeTai); // Kiểm tra tồn tại trước khi xóa

    // 1. Gửi request sang Gateway yêu cầu Registration Service xóa các bản ghi đăng ký của đề tài này
    try {
      await fetch(`${GATEWAY_URL}/api/registrations/by-topic/${maDeTai}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Lỗi kết nối Gateway';
      console.error('[TopicService] Lỗi xóa dữ liệu đăng ký liên quan qua Gateway:', message);
    }

    // 2. Xóa đề tài khỏi CSDL nội bộ
    const result = TopicModel.delete(maDeTai);
    return result.changes > 0;
  }
}

module.exports = TopicService;