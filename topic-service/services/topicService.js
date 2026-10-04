const ITopicService = require('../interfaces/ITopicService');
const TopicModel = require('../models/topicModel');

// URL trực tiếp tới API Gateway
const GATEWAY_URL = 'http://localhost:3000';

/**
 * @implements {ITopicService}
 */
class TopicService extends ITopicService {
  /**
   * Lấy danh sách tất cả đề tài
   * @returns {import('../types/topicTypes').TopicEntity[]}
   */
  static getAllTopics() {
    return TopicModel.findAll();
  }

  /**
   * Lấy chi tiết đề tài theo mã
   * @param {string} maDeTai
   * @returns {import('../types/topicTypes').TopicEntity}
   */
  static getTopicByMaDeTai(maDeTai) {
    const topic = TopicModel.findByMaDeTai(maDeTai);
    if (!topic) {
      throw new Error(`Không tìm thấy đề tài với mã: ${maDeTai}`);
    }
    return topic;
  }

  /**
   * Tạo mới đề tài
   * @param {import('../types/topicTypes').CreateTopicDTO} dto
   * @returns {import('../types/topicTypes').TopicEntity}
   */
  static createTopic(dto) {
    const existing = TopicModel.findByMaDeTai(dto.maDeTai);
    if (existing) {
      throw new Error(`Đề tài với mã ${dto.maDeTai} đã tồn tại!`);
    }

    TopicModel.create(dto);

    const created = TopicModel.findByMaDeTai(dto.maDeTai);
    if (!created) {
      throw new Error('Lỗi trong quá trình tạo đề tài');
    }
    return created;
  }

  /**
   * Cập nhật thông tin đề tài & tự động đồng bộ tên sang Registration Service qua Gateway
   * @param {string} maDeTai
   * @param {import('../types/topicTypes').UpdateTopicDTO} dto
   * @returns {Promise<import('../types/topicTypes').TopicEntity>}
   */
  static async updateTopic(maDeTai, dto) {
    const existing = this.getTopicByMaDeTai(maDeTai); // Lấy thông tin hiện tại & kiểm tra tồn tại

    const updatedTopic = {
      tenDeTai: dto.tenDeTai || existing.tenDeTai,
      moTa: dto.moTa !== undefined ? dto.moTa : existing.moTa,
      giangVienHuongDan: dto.giangVienHuongDan || existing.giangVienHuongDan,
      trangThai: dto.trangThai || existing.trangThai
    };

    TopicModel.update(maDeTai, updatedTopic);

    const updated = TopicModel.findByMaDeTai(maDeTai);
    if (!updated) {
      throw new Error('Lỗi trong quá trình cập nhật đề tài');
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
        console.error('[TopicService] Lỗi đồng bộ đề tài qua Gateway:', message);
      }
    }

    return updated;
  }

  /**
   * Cập nhật riêng trạng thái đề tài
   * @param {string} maDeTai
   * @param {import('../types/topicTypes').UpdateTopicStatusDTO} dto
   * @returns {import('../types/topicTypes').TopicEntity}
   */
  static updateTopicStatus(maDeTai, dto) {
    this.getTopicByMaDeTai(maDeTai); // Kiểm tra tồn tại trước
    TopicModel.updateStatus(maDeTai, dto.trangThai);

    const updated = TopicModel.findByMaDeTai(maDeTai);
    if (!updated) {
      throw new Error('Lỗi trong quá trình cập nhật trạng thái đề tài');
    }
    return updated;
  }

  /**
   * Xóa đề tài theo mã
   * @param {string} maDeTai
   * @returns {boolean}
   */
  static deleteTopic(maDeTai) {
    this.getTopicByMaDeTai(maDeTai); // Kiểm tra tồn tại trước
    const result = TopicModel.delete(maDeTai);
    return result.changes > 0;
  }
}

module.exports = TopicService;