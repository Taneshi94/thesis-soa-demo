const TopicModel = require('../models/topicModel');
const ITopicService = require('../interfaces/ITopicService');
const { AppError } = require('../errorHandler');

/**
 * @implements {ITopicService}
 */
class TopicService extends ITopicService {
  /**
   * @returns {Promise<import('../types/topicTypes').TopicEntity[]>}
   */
  static async getAllTopics() {
    return TopicModel.findAll();
  }

  /**
   * @param {string} maDeTai
   * @returns {Promise<import('../types/topicTypes').TopicEntity>}
   */
  static async getTopicByMaDeTai(maDeTai) {
    const topic = TopicModel.findByMaDeTai(maDeTai);
    if (!topic) {
      throw new AppError(`Không tìm thấy đề tài với mã ${maDeTai}`, 404);
    }
    return topic;
  }

  /**
   * @param {string} maDeTai
   * @param {import('../types/topicTypes').UpdateTopicStatusDTO} dto
   * @returns {Promise<import('../types/topicTypes').TopicEntity>}
   */
  static async updateTopicStatus(maDeTai, dto) {
    const validStatuses = ['ConMo', 'DaDangKy', 'Dong'];
    if (!validStatuses.includes(dto.trangThai)) {
      throw new AppError('Trạng thái không hợp lệ', 400);
    }

    const topic = TopicModel.findByMaDeTai(maDeTai);
    if (!topic) {
      throw new AppError(`Không tìm thấy đề tài với mã ${maDeTai}`, 404);
    }

    TopicModel.updateStatus(maDeTai, dto.trangThai);
    return { ...topic, trangThai: dto.trangThai };
  }
}

module.exports = TopicService;