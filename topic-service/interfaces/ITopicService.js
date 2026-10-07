const { AppError } = require('../errorHandler');

/**
 * @typedef {import('../types/topicTypes').TopicEntity} TopicEntity
 * @typedef {import('../types/topicTypes').CreateTopicDTO} CreateTopicDTO
 * @typedef {import('../types/topicTypes').UpdateTopicDTO} UpdateTopicDTO
 * @typedef {import('../types/topicTypes').UpdateTopicStatusDTO} UpdateTopicStatusDTO
 */

/**
 * Interface định nghĩa các phương thức xử lý nghiệp vụ Đề tài
 */
class ITopicService {
  /**
   * 1. Lấy danh sách tất cả đề tài
   * @returns {TopicEntity[]}
   * @throws {AppError} 501 - Nếu chưa được triển khai
   */
  static getAllTopics() {
    throw new AppError("Phương thức 'getAllTopics()' chưa được triển khai!", 501);
  }

  /**
   * 2. Lấy chi tiết đề tài theo mã
   * @param {string} maDeTai
   * @returns {TopicEntity}
   * @throws {AppError} 501 - Nếu chưa được triển khai
   */
  static getTopicByMaDeTai(maDeTai) {
    throw new AppError("Phương thức 'getTopicByMaDeTai()' chưa được triển khai!", 501);
  }

  /**
   * 3. Tạo mới đề tài
   * @param {CreateTopicDTO} dto
   * @returns {TopicEntity}
   * @throws {AppError} 501 - Nếu chưa được triển khai
   */
  static createTopic(dto) {
    throw new AppError("Phương thức 'createTopic()' chưa được triển khai!", 501);
  }

  /**
   * 4. Cập nhật thông tin đề tài (Bất đồng bộ - Có đồng bộ tên qua Gateway)
   * @param {string} maDeTai
   * @param {UpdateTopicDTO} dto
   * @returns {Promise<TopicEntity>}
   * @throws {AppError} 501 - Nếu chưa được triển khai
   */
  static async updateTopic(maDeTai, dto) {
    throw new AppError("Phương thức 'updateTopic()' chưa được triển khai!", 501);
  }

  /**
   * 5. Cập nhật riêng trạng thái đề tài (Bất đồng bộ)
   * @param {string} maDeTai
   * @param {UpdateTopicStatusDTO} dto
   * @returns {Promise<TopicEntity>}
   * @throws {AppError} 501 - Nếu chưa được triển khai
   */
  static async updateTopicStatus(maDeTai, dto) {
    throw new AppError("Phương thức 'updateTopicStatus()' chưa được triển khai!", 501);
  }

  /**
   * 6. Xóa đề tài theo mã (Bất đồng bộ - Có gửi xóa đăng ký liên quan sang Gateway)
   * @param {string} maDeTai
   * @returns {Promise<boolean>}
   * @throws {AppError} 501 - Nếu chưa được triển khai
   */
  static async deleteTopic(maDeTai) {
    throw new AppError("Phương thức 'deleteTopic()' chưa được triển khai!", 501);
  }
}

module.exports = ITopicService;