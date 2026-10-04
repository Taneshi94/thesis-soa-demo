/**
 * Dữ liệu bản ghi trong CSDL (Bảng DETAI)
 * @typedef {Object} TopicEntity
 * @property {string} maDeTai
 * @property {string} tenDeTai
 * @property {string} giangVienHD
 * @property {'ConMo' | 'DaDangKy' | 'Dong'} trangThai
 */

/**
 * Payload khi cập nhật trạng thái đề tài (Request Body)
 * @typedef {Object} UpdateTopicStatusDTO
 * @property {'ConMo' | 'DaDangKy' | 'Dong'} trangThai
 */

module.exports = {};