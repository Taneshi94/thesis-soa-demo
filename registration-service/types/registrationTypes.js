/**
 * Dữ liệu bản ghi trong CSDL (Bảng DANGKY)
 * @typedef {Object} RegistrationEntity
 * @property {string} maDangKy
 * @property {string} mssv
 * @property {string} tenSinhVien
 * @property {string} maDeTai
 * @property {string} tenDeTai
 * @property {string} ngayDangKy
 * @property {'ThanhCong' | 'Huy'} trangThai
 */

/**
 * Payload khi sinh viên gửi yêu cầu đăng ký (Request Body)
 * @typedef {Object} CreateRegistrationDTO
 * @property {string} mssv
 * @property {string} maDeTai
 */

module.exports = {};