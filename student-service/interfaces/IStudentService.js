const AppError = require('../errorHandler').AppError;
/**
 * Interface định nghĩa các phương thức nghiệp vụ (Business Logic) cho Sinh viên
 */
class IStudentService {
  /**
   * Lấy danh sách toàn bộ sinh viên
   * @returns {import('../types/studentTypes').StudentEntity[]}
   * @throws {AppError} Nếu có lỗi xảy ra trong quá trình lấy dữ liệu
   */
  static getAllStudents() {
    throw new AppError('Phương thức getAllStudents() chưa được triển khai!', 501);
  }

  /**
   * 2. Lấy thông tin sinh viên theo MSSV
   * @param {string} mssv
   * @returns {import('../types/studentTypes').StudentEntity}
   * @throws {AppError} 404 - Khi không tìm thấy sinh viên
   * @throws {AppError} 501 - Nếu chưa được triển khai
   */
  static getStudentByMssv(mssv) {
    throw new AppError('Phương thức getStudentByMssv() chưa được triển khai!', 501);
  }

  /**
   * 3. Tạo sinh viên mới
   * @param {import('../types/studentTypes').CreateStudentDTO} dto
   * @returns {import('../types/studentTypes').StudentEntity}
   * @throws {AppError} 409 - Khi MSSV đã tồn tại
   * @throws {AppError} 501 - Nếu chưa được triển khai
   */
  static createStudent(dto) {
    throw new AppError('Phương thức createStudent() chưa được triển khai!', 501);
  }

  /**
   * 4. Cập nhật thông tin sinh viên (Bất đồng bộ - gọi API Gateway đồng bộ)
   * @param {string} mssv
   * @param {import('../types/studentTypes').UpdateStudentDTO} dto
   * @returns {Promise<import('../types/studentTypes').StudentEntity>}
   * @throws {AppError} 404 - Khi không tìm thấy sinh viên
   * @throws {AppError} 501 - Nếu chưa được triển khai
   */
  static async updateStudent(mssv, dto) {
    throw new AppError('Phương thức updateStudent() chưa được triển khai!', 501);
  }

  /**
   * 5. Xóa sinh viên theo MSSV (Bất đồng bộ - gọi API Gateway đồng bộ)
   * @param {string} mssv
   * @returns {Promise<boolean>}
   * @throws {AppError} 404 - Khi không tìm thấy sinh viên
   * @throws {AppError} 501 - Nếu chưa được triển khai
   */
  static async deleteStudent(mssv) {
    throw new AppError('Phương thức deleteStudent() chưa được triển khai!', 501);
  }
}

module.exports = IStudentService;