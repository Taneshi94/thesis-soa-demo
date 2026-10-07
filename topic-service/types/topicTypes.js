/**
 * Dữ liệu bản ghi trong CSDL (Bảng DETAI)
 * @typedef {Object} TopicEntity
 * @property {string} maDeTai
 * @property {string} tenDeTai
 * @property {string} [moTa]
 * @property {string} giangVienHuongDan
 * @property {0 | 1 | 2} trangThai - Trạng thái dạng số từ CSDL (0: Mở, 1: Đã đăng ký, 2: Đã đóng)
 */

/**
 * Payload khi tạo mới đề tài (Request Body)
 * @typedef {Object} CreateTopicDTO
 * @property {string} maDeTai
 * @property {string} tenDeTai
 * @property {string} [moTa]
 * @property {string} giangVienHuongDan
 */

/**
 * Payload khi cập nhật thông tin đề tài (Request Body)
 * @typedef {Object} UpdateTopicDTO
 * @property {string} [tenDeTai]
 * @property {string} [moTa]
 * @property {string} [giangVienHuongDan]
 */

/**
 * Payload khi chỉ cập nhật riêng trạng thái đề tài (Request Body)
 * @typedef {Object} UpdateTopicStatusDTO
 * @property {0 | 1 | 2 | string | number} trangThai - Chấp nhận số hoặc chuỗi từ JSON request body
 */

module.exports = {};