/**
 * Dữ liệu bản ghi trong CSDL (Bảng SINHVIEN)
 * @typedef {Object} StudentEntity
 * @property {string} mssv
 * @property {string} hoTen
 * @property {string} lop
 * @property {string} email
 */

/**
 * Payload khi tạo mới sinh viên (Request Body)
 * @typedef {Object} CreateStudentDTO
 * @property {string} mssv
 * @property {string} hoTen
 * @property {string} lop
 * @property {string} email
 */

/**
 * Payload khi cập nhật sinh viên (Request Body)
 * @typedef {Object} UpdateStudentDTO
 * @property {string} hoTen
 * @property {string} lop
 * @property {string} email
 */
module.exports = {};