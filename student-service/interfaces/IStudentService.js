/**
 * Interface định nghĩa các phương thức nghiệp vụ (Business Logic) cho Sinh viên
 */
class IStudentService {
  /**
   * Lấy danh sách toàn bộ sinh viên
   * @returns {import('../types/studentTypes').StudentEntity[]}
   */
  static getAllStudents() {
    throw new Error("Phương thức 'getAllStudents()' chưa được triển khai!");
  }

  /**
   * Lấy thông tin sinh viên theo MSSV
   * @param {string} mssv
   * @returns {import('../types/studentTypes').StudentEntity | undefined}
   */
  static getStudentByMssv(mssv) {
    throw new Error("Phương thức 'getStudentByMssv()' chưa được triển khai!");
  }

  /**
   * Tạo mới sinh viên
   * @param {import('../types/studentTypes').CreateStudentDTO} dto
   * @returns {import('../types/studentTypes').StudentEntity}
   */
  static createStudent(dto) {
    throw new Error("Phương thức 'createStudent()' chưa được triển khai!");
  }

  /**
   * Cập nhật thông tin sinh viên
   * @param {string} mssv
   * @param {import('../types/studentTypes').UpdateStudentDTO} dto
   * @returns {Promise<import('../types/studentTypes').StudentEntity>}
   */
  static updateStudent(mssv, dto) {
    throw new Error("Phương thức 'updateStudent()' chưa được triển khai!");
  }

  /**
   * Xóa sinh viên theo MSSV
   * @param {string} mssv
   * @returns {boolean}
   */
  static deleteStudent(mssv) {
    throw new Error("Phương thức 'deleteStudent()' chưa được triển khai!");
  }
}

module.exports = IStudentService;