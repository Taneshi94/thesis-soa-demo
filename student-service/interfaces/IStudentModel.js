/**
 * Interface định nghĩa các phương thức thao tác dữ liệu Sinh viên
 */
class IStudentModel {
  /**
   * @returns {import('../types/studentTypes').StudentEntity[]}
   */
  static findAll() {
    throw new Error("Phương thức 'findAll()' chưa được triển khai!");
  }

  /**
   * @param {string} mssv
   * @returns {import('../types/studentTypes').StudentEntity | undefined}
   */
  static findByMssv(mssv) {
    throw new Error("Phương thức 'findByMssv()' chưa được triển khai!");
  }

  /**
   * @param {import('../types/studentTypes').CreateStudentDTO} data
   * @returns {import('better-sqlite3').RunResult}
   */
  static create(data) {
    throw new Error("Phương thức 'create()' chưa được triển khai!");
  }

  /**
   * @param {string} mssv
   * @param {import('../types/studentTypes').UpdateStudentDTO} data
   * @returns {import('better-sqlite3').RunResult}
   */
  static update(mssv, data) {
    throw new Error("Phương thức 'update()' chưa được triển khai!");
  }

  /**
   * @param {string} mssv
   * @returns {import('better-sqlite3').RunResult}
   */
  static delete(mssv) {
    throw new Error("Phương thức 'delete()' chưa được triển khai!");
  }
}

module.exports = IStudentModel;