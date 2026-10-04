/**
 * Interface định nghĩa các phương thức nghiệp vụ cho Đề tài
 */
class ITopicService {
  /**
   * Lấy danh sách tất cả các đề tài
   * @returns {import('../types/topicTypes').TopicEntity[]}
   */
  static getAllTopics() {
    throw new Error("Phương thức 'getAllTopics()' chưa được triển khai!");
  }

  /**
   * Lấy thông tin đề tài theo mã đề tài
   * @param {string} maDeTai
   * @returns {import('../types/topicTypes').TopicEntity}
   */
  static getTopicByMaDeTai(maDeTai) {
    throw new Error("Phương thức 'getTopicByMaDeTai()' chưa được triển khai!");
  }

  /**
   * Tạo mới đề tài
   * @param {import('../types/topicTypes').CreateTopicDTO} dto
   * @returns {import('../types/topicTypes').TopicEntity}
   */
  static createTopic(dto) {
    throw new Error("Phương thức 'createTopic()' chưa được triển khai!");
  }

  /**
 * @param {string} maDeTai
 * @param {import('../types/topicTypes').UpdateTopicDTO} dto
 * @returns {Promise<import('../types/topicTypes').TopicEntity>}
 */
  static updateTopic(maDeTai, dto) {
    throw new Error("Phương thức 'updateTopic()' chưa được triển khai!");
  }

  /**
   * Cập nhật trạng thái đề tài
   * @param {string} maDeTai
   * @param {import('../types/topicTypes').UpdateTopicStatusDTO} dto
   * @returns {import('../types/topicTypes').TopicEntity}
   */
  static updateTopicStatus(maDeTai, dto) {
    throw new Error("Phương thức 'updateTopicStatus()' chưa được triển khai!");
  }

  /**
   * Xóa đề tài theo mã
   * @param {string} maDeTai
   * @returns {boolean}
   */
  static deleteTopic(maDeTai) {
    throw new Error("Phương thức 'deleteTopic()' chưa được triển khai!");
  }
}

module.exports = ITopicService;