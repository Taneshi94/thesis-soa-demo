/**
 * Interface định nghĩa các phương thức thao tác dữ liệu Đề tài
 */
class ITopicModel {
  /**
   * @returns {import('../types/topicTypes').TopicEntity[]}
   */
  static findAll() {
    throw new Error("Phương thức 'findAll()' chưa được triển khai!");
  }

  /**
   * @param {string} maDeTai
   * @returns {import('../types/topicTypes').TopicEntity | undefined}
   */
  static findByMaDeTai(maDeTai) {
    throw new Error("Phương thức 'findByMaDeTai()' chưa được triển khai!");
  }

  /**
   * @param {import('../types/topicTypes').CreateTopicDTO} data
   * @returns {import('better-sqlite3').RunResult}
   */
  static create(data) {
    throw new Error("Phương thức 'create()' chưa được triển khai!");
  }

  /**
   * @param {string} maDeTai
   * @param {import('../types/topicTypes').UpdateTopicDTO} data
   * @returns {import('better-sqlite3').RunResult}
   */
  static update(maDeTai, data) {
    throw new Error("Phương thức 'update()' chưa được triển khai!");
  }

  /**
   * @param {string} maDeTai
   * @returns {import('better-sqlite3').RunResult}
   */
  static delete(maDeTai) {
    throw new Error("Phương thức 'delete()' chưa được triển khai!");
  }

  /**
   * Cập nhật riêng trạng thái của đề tài (ví dụ: 'ConMo' -> 'DaDangKy')
   * @param {string} maDeTai
   * @param {string} trangThai
   * @returns {import('better-sqlite3').RunResult}
   */
  static updateStatus(maDeTai, trangThai) {
    throw new Error("Phương thức 'updateStatus()' chưa được triển khai!");
  }
}

module.exports = ITopicModel;