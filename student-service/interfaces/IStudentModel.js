const AppError = require('../errorHandler').AppError;

/**
 * @typedef {import('../types/studentTypes').StudentEntity} StudentEntity
 * @typedef {import('../types/studentTypes').CreateStudentDTO} CreateStudentDTO
 * @typedef {import('../types/studentTypes').UpdateStudentDTO} UpdateStudentDTO
 * @typedef {import('better-sqlite3').RunResult} RunResult
 */

/**
 * Interface định nghĩa các phương thức thao tác dữ liệu Sinh viên
 */
class IStudentModel {
  /**
   * 1. Lấy tất cả sinh viên từ CSDL
   * @returns {StudentEntity[]}
   * @throws {AppError} 501 - Nếu chưa được triển khai
   */
  static findAll() {
    throw new AppError('Phương thức findAll() chưa được triển khai!', 501);
  }

  /**
   * 2. Tìm sinh viên theo MSSV
   * @param {string} mssv
   * @returns {StudentEntity | null}
   * @throws {AppError} 501 - Nếu chưa được triển khai
   */
  static findByMssv(mssv) {
    throw new AppError('Phương thức findByMssv() chưa được triển khai!', 501);
  }

  /**
   * 3. Thêm mới sinh viên vào CSDL
   * @param {CreateStudentDTO} dto
   * @returns {RunResult}
   * @throws {AppError} 501 - Nếu chưa được triển khai
   */
  static create(dto) {
    throw new AppError('Phương thức create() chưa được triển khai!', 501);
  }

  /**
   * 4. Cập nhật thông tin sinh viên trong CSDL
   * @param {string} mssv
   * @param {UpdateStudentDTO} dto
   * @returns {RunResult}
   * @throws {AppError} 501 - Nếu chưa được triển khai
   */
  static update(mssv, dto) {
    throw new AppError('Phương thức update() chưa được triển khai!', 501);
  }

  /**
   * 5. Xóa sinh viên khỏi CSDL
   * @param {string} mssv
   * @returns {RunResult}
   * @throws {AppError} 501 - Nếu chưa được triển khai
   */
  static delete(mssv) {
    throw new AppError('Phương thức delete() chưa được triển khai!', 501);
  }
}

module.exports = IStudentModel;