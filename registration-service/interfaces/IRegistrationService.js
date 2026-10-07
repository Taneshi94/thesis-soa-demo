/**
 * @typedef {import('../types/registrationTypes').RegistrationEntity} RegistrationEntity
 * @typedef {import('../types/registrationTypes').CreateRegistrationDTO} CreateRegistrationDTO
 * @typedef {import('better-sqlite3').RunResult} RunResult
 */

/**
 * Interface quy định các phương thức chuẩn cho Registration Service
 */
class IRegistrationService {

  /**
   * 1. Lấy tất cả bản ghi đăng ký
   * @returns {RegistrationEntity[]}
   */
  static getAllRegistrations() {
    throw new Error('Method getAllRegistrations() must be implemented');
  }

  /**
   * 2. Lấy thông tin 1 phiếu đăng ký theo maDangKy
   * @param {string} maDangKy
   * @returns {RegistrationEntity}
   */
  static getByMaDangKy(maDangKy) {
    throw new Error('Method getByMaDangKy() must be implemented');
  }

  /**
   * 3. Đăng ký đề tài
   * @param {CreateRegistrationDTO} dto
   * @returns {Promise<RegistrationEntity>}
   */
  static async registerTopic(dto) {
    throw new Error('Method registerTopic() must be implemented');
  }

  /**
   * 4. Cập nhật thông tin phiếu đăng ký
   * @param {string} maDangKy
   * @param {Partial<RegistrationEntity>} data
   * @returns {Promise<RegistrationEntity>}
   */
  static async updateRegistration(maDangKy, data) {
    throw new Error('Method updateRegistration() must be implemented');
  }

  /**
   * 5. Đồng bộ thông tin sinh viên
   * @param {string} mssv
   * @param {string} tenSinhVien
   * @returns {Promise<RunResult>}
   */
  static async syncStudentInfo(mssv, tenSinhVien) {
    throw new Error('Method syncStudentInfo() must be implemented');
  }

  /**
   * 6. Đồng bộ thông tin đề tài
   * @param {string} maDeTai
   * @param {string} tenDeTai
   * @returns {Promise<RunResult>}
   */
  static async syncTopicInfo(maDeTai, tenDeTai) {
    throw new Error('Method syncTopicInfo() must be implemented');
  }

  /**
   * 7. Xóa phiếu đăng ký
   * @param {string} maDangKy
   * @returns {void}
   */
  static deleteRegistration(maDangKy) {
    throw new Error('Method deleteRegistration() must be implemented');
  }

  /**
   * 8. Xóa phiếu đăng ký theo mssv
   * @param {string} mssv
   * @returns {RunResult}
   */
  static deleteByMssv(mssv) {
    throw new Error('Method deleteByMssv() must be implemented');
  }

  /**
   * 9. Xóa phiếu đăng ký theo maDeTai
   * @param {string} maDeTai
   * @returns {RunResult}
   */
  static deleteByMaDeTai(maDeTai) {
    throw new Error('Method deleteByMaDeTai() must be implemented');
  }
}

module.exports = IRegistrationService;