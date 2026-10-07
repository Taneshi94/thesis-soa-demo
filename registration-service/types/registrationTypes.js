/**
 * Dữ liệu bản ghi trong CSDL (Bảng DANGKY)
 * @typedef {Object} RegistrationEntity
 * @property {string} maDangKy
 * @property {string} mssv
 * @property {string} tenSinhVien
 * @property {string} maDeTai
 * @property {string} tenDeTai
 * @property {string} ngayDangKy
 */

/**
 * Payload khi sinh viên gửi yêu cầu đăng ký (Request Body)
 * @typedef {Object} CreateRegistrationDTO
 * @property {string} mssv
 * @property {string} maDeTai
 */

/**
 * Payload khi cập nhật thông tin đăng ký (Request Body)
 * @typedef {Object} UpdateRegistrationDTO
 * @property {string} [tenSinhVien]
 * @property {string} [tenDeTai]
 */
module.exports = {};