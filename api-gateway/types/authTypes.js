/**
 * Payload khi gửi yêu cầu đăng nhập (Request Body)
 * @typedef {Object} LoginDTO
 * @property {string} username
 * @property {string} password
 */

/**
 * Kết quả trả về sau khi đăng nhập thành công (Response Payload)
 * @typedef {Object} LoginResponseDTO
 * @property {boolean} success
 * @property {string} message
 * @property {string} token
 * @property {'SINHVIEN' | 'QUANLY'} role
 */

module.exports = {};