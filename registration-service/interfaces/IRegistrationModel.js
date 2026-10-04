/**
 * Interface định nghĩa các phương thức thao tác dữ liệu Đăng ký
 */
class IRegistrationModel {
  /**
   * @returns {import('../types/registrationTypes').RegistrationEntity[]}
   */
  static findAll() {
    throw new Error("Phương thức 'findAll()' chưa được triển khai!");
  }

  /**
   * @param {string} maDangKy
   * @returns {import('../types/registrationTypes').RegistrationEntity | undefined}
   */
  static findByMaDangKy(maDangKy) {
    throw new Error("Phương thức 'findByMaDangKy()' chưa được triển khai!");
  }

  /**
   * @param {string} mssv
   * @returns {import('../types/registrationTypes').RegistrationEntity[]}
   */
  static findByMssv(mssv) {
    throw new Error("Phương thức 'findByMssv()' chưa được triển khai!");
  }

  /**
   * @param {import('../types/registrationTypes').CreateRegistrationDTO} data
   * @returns {import('better-sqlite3').RunResult}
   */
  static create(data) {
    throw new Error("Phương thức 'create()' chưa được triển khai!");
  }

  /**
   * @param {string} maDangKy
   * @param {import('../types/registrationTypes').UpdateRegistrationDTO} data
   * @returns {import('better-sqlite3').RunResult}
   */
  static update(maDangKy, data) {
    throw new Error("Phương thức 'update()' chưa được triển khai!");
  }

  static updateStudentInfo(mssv, tenSinhVien) {
    throw new Error("Phương thức 'updateStudentName()' chưa được triển khai!");
  }

  static updateTopicInfo(maDeTai, tenDeTai) {
    throw new Error("Phương thức 'updateTopicName()' chưa được triển khai!");
  }
  /**
   * @param {string} maDangKy
   * @returns {import('better-sqlite3').RunResult}
   */
  static delete(maDangKy) {
    throw new Error("Phương thức 'delete()' chưa được triển khai!");
  }
}

module.exports = IRegistrationModel;