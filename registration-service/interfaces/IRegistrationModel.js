const { AppError } = require('../errorHandler');

/**
 * @typedef {import('../types/registrationTypes').RegistrationEntity} RegistrationEntity
 * @typedef {import('better-sqlite3').RunResult} RunResult
 */

/**
 * Interface quy định các phương thức chuẩn cho Registration Model
 */
class IRegistrationModel {
  /**
   * 1. Lấy tất cả bản ghi đăng ký
   * @returns {RegistrationEntity[]}
   * @throws {AppError} 501 - Nếu chưa được triển khai
   */
  static findAll() {
    throw new AppError("Phương thức 'findAll()' chưa được triển khai!", 501);
  }

  /**
   * 2. Lấy thông tin 1 phiếu đăng ký theo maDangKy
   * @param {string} maDangKy
   * @returns {RegistrationEntity | undefined}
   * @throws {AppError} 501 - Nếu chưa được triển khai
   */
  static findByMaDangKy(maDangKy) {
    throw new AppError("Phương thức 'findByMaDangKy()' chưa được triển khai!", 501);
  }

  /**
   * 3. Tạo mới 1 bản ghi đăng ký
   * @param {RegistrationEntity} data
   * @returns {RunResult}
   * @throws {AppError} 501 - Nếu chưa được triển khai
   */
  static create(data) {
    throw new AppError("Phương thức 'create()' chưa được triển khai!", 501);
  }

  /**
   * 4. Cập nhật thông tin phiếu đăng ký
   * @param {string} maDangKy
   * @param {RegistrationEntity} data
   * @returns {RunResult}
   * @throws {AppError} 501 - Nếu chưa được triển khai
   */
  static update(maDangKy, data) {
    throw new AppError("Phương thức 'update()' chưa được triển khai!", 501);
  }

  /**
   * 5. Cập nhật thông tin sinh viên trong bản ghi đăng ký
   * @param {string} mssv
   * @param {string} tenSinhVien
   * @returns {RunResult}
   * @throws {AppError} 501 - Nếu chưa được triển khai
   */
  static updateStudentInfo(mssv, tenSinhVien) {
    throw new AppError("Phương thức 'updateStudentInfo()' chưa được triển khai!", 501);
  }

  /**
   * 6. Cập nhật thông tin đề tài trong bản ghi đăng ký
   * @param {string} maDeTai
   * @param {string} tenDeTai
   * @returns {RunResult}
   * @throws {AppError} 501 - Nếu chưa được triển khai
   */
  static updateTopicInfo(maDeTai, tenDeTai) {
    throw new AppError("Phương thức 'updateTopicInfo()' chưa được triển khai!", 501);
  }

  /**
   * 7. Xóa phiếu đăng ký theo maDangKy
   * @param {string} maDangKy
   * @returns {RunResult}
   * @throws {AppError} 501 - Nếu chưa được triển khai
   */
  static delete(maDangKy) {
    throw new AppError("Phương thức 'delete()' chưa được triển khai!", 501);
  }

  /**
   * 8. Xóa phiếu đăng ký theo mssv
   * @param {string} mssv
   * @returns {RunResult}
   * @throws {AppError} 501 - Nếu chưa được triển khai
   */
  static deleteByMssv(mssv) {
    throw new AppError("Phương thức 'deleteByMssv()' chưa được triển khai!", 501);
  }

  /**
   * 9. Xóa phiếu đăng ký theo maDeTai
   * @param {string} maDeTai
   * @returns {RunResult}
   * @throws {AppError} 501 - Nếu chưa được triển khai
   */
  static deleteByMaDeTai(maDeTai) {
    throw new AppError("Phương thức 'deleteByMaDeTai()' chưa được triển khai!", 501);
  }
}

module.exports = IRegistrationModel;