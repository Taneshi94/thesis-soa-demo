const { AppError } = require('../errorHandler');

/**
 * @typedef {import('../types/topicTypes').TopicEntity} TopicEntity
 * @typedef {import('../types/topicTypes').UpdateTopicDTO} UpdateTopicDTO
 * @typedef {import('better-sqlite3').RunResult} RunResult
 */

/**
 * Interface định nghĩa các phương thức thao tác dữ liệu Đề tài
 */
class ITopicModel {
  /**
   * 1. Lấy tất cả đề tài
   * @returns {TopicEntity[]}
   * @throws {AppError} 501 - Nếu chưa được triển khai
   */
  static findAll() {
    throw new AppError("Phương thức 'findAll()' chưa được triển khai!", 501);
  }

  /**
   * 2. Tìm đề tài theo mã đề tài
   * @param {string} maDeTai
   * @returns {TopicEntity | null}
   * @throws {AppError} 501 - Nếu chưa được triển khai
   */
  static findByMaDeTai(maDeTai) {
    throw new AppError("Phương thức 'findByMaDeTai()' chưa được triển khai!", 501);
  }

  /**
   * 3. Thêm mới đề tài vào CSDL (Sử dụng TopicEntity đầy đủ)
   * @param {TopicEntity} data
   * @returns {RunResult}
   * @throws {AppError} 501 - Nếu chưa được triển khai
   */
  static create(data) {
    throw new AppError("Phương thức 'create()' chưa được triển khai!", 501);
  }

  /**
   * 4. Cập nhật thông tin chung đề tài (Không cập nhật trạng thái)
   * @param {string} maDeTai
   * @param {UpdateTopicDTO} data
   * @returns {RunResult}
   * @throws {AppError} 501 - Nếu chưa được triển khai
   */
  static update(maDeTai, data) {
    throw new AppError("Phương thức 'update()' chưa được triển khai!", 501);
  }

  /**
   * 5. Xóa đề tài khỏi CSDL
   * @param {string} maDeTai
   * @returns {RunResult}
   * @throws {AppError} 501 - Nếu chưa được triển khai
   */
  static delete(maDeTai) {
    throw new AppError("Phương thức 'delete()' chưa được triển khai!", 501);
  }

  /**
   * 6. Cập nhật riêng trạng thái của đề tài
   * @param {string} maDeTai
   * @param {string | number} trangThai
   * @returns {RunResult}
   * @throws {AppError} 501 - Nếu chưa được triển khai
   */
  static updateStatus(maDeTai, trangThai) {
    throw new AppError("Phương thức 'updateStatus()' chưa được triển khai!", 501);
  }
}

module.exports = ITopicModel;