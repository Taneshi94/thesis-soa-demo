/**
 * Dữ liệu bản ghi trong CSDL (Bảng DETAI)
 * @typedef {Object} TopicEntity
 * @property {string} maDeTai
 * @property {string} tenDeTai
 * @property {string} [moTa]
 * @property {string} giangVienHuongDan
 * @property {'ConMo' | 'DaDangKy' | 'Dong'} trangThai
 */

/**
 * Payload khi tạo mới đề tài (Request Body)
 * @typedef {Object} CreateTopicDTO
 * @property {string} maDeTai
 * @property {string} tenDeTai
 * @property {string} [moTa]
 * @property {string} giangVienHuongDan
 * @property {'ConMo' | 'DaDangKy' | 'Dong'} trangThai
 */

/**
 * Payload khi cập nhật thông tin đề tài (Request Body)
 * @typedef {Object} UpdateTopicDTO
 * @property {string} [tenDeTai]
 * @property {string} [moTa]
 * @property {string} [giangVienHuongDan]
 * @property {'ConMo' | 'DaDangKy' | 'Dong'} [trangThai]
 */

/**
 * Payload khi chỉ cập nhật riêng trạng thái đề tài (Request Body)
 * @typedef {Object} UpdateTopicStatusDTO
 * @property {'ConMo' | 'DaDangKy' | 'Dong'} trangThai
 */

module.exports = {};