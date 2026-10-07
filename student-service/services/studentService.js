const IStudentService = require('../interfaces/IStudentService');
const StudentModel = require('../models/studentModel');
const { AppError } = require('../errorHandler');

const GATEWAY_URL = 'http://localhost:3000';

/**
 * @implements {IStudentService}
 */
class StudentService extends IStudentService {
  /**
   * 1. Lấy tất cả sinh viên
   * @returns {import('../types/studentTypes').StudentEntity[]}
   */
  static getAllStudents() {
    return StudentModel.findAll();
  }

  /**
   * 2. Lấy thông tin sinh viên theo MSSV
   * @param {string} mssv
   * @returns {import('../types/studentTypes').StudentEntity}
   */
  static getStudentByMssv(mssv) {
    const student = StudentModel.findByMssv(mssv);
    if (!student) {
      throw new AppError(`Không tìm thấy sinh viên với MSSV: ${mssv}`, 404);
    }
    return student;
  }

  /**
   * 3. Tạo sinh viên mới
   * @param {import('../types/studentTypes').CreateStudentDTO} dto
   * @returns {import('../types/studentTypes').StudentEntity}
   */
  static createStudent(dto) {
    const existing = StudentModel.findByMssv(dto.mssv);
    if (existing) {
      throw new AppError(`Sinh viên với MSSV ${dto.mssv} đã tồn tại!`, 409);
    }

    StudentModel.create(dto);
    
    const created = StudentModel.findByMssv(dto.mssv);
    if (!created) {
      throw new AppError('Lỗi trong quá trình tạo sinh viên', 500);
    }
    return created;
  }

  /**
   * 4. Cập nhật thông tin sinh viên
   * @param {string} mssv
   * @param {import('../types/studentTypes').UpdateStudentDTO} dto
   * @returns {Promise<import('../types/studentTypes').StudentEntity>}
   */
  static async updateStudent(mssv, dto) {
    const existing = this.getStudentByMssv(mssv); // Lấy thông tin hiện tại & kiểm tra tồn tại

    StudentModel.update(mssv, dto);

    const updated = StudentModel.findByMssv(mssv);
    if (!updated) {
      throw new AppError('Lỗi trong quá trình cập nhật sinh viên', 500);
    }
    if (dto.hoTen && dto.hoTen !== existing.hoTen) {
      try {
        await fetch(`${GATEWAY_URL}/api/registrations/sync-student/${mssv}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tenSinhVien: dto.hoTen })
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Lỗi đồng bộ sinh viên';
        console.error('[StudentService] Lỗi đồng bộ sinh viên qua Gateway:', message);
      }
    }

    return updated;
  }

  /**
   * 5. Xóa sinh viên theo MSSV
   * @param {string} mssv
   * @returns {Promise<boolean>}
   */
  static async deleteStudent(mssv) {
    // Kiểm tra tồn tại, tự động ném AppError(404) nếu không tìm thấy
    this.getStudentByMssv(mssv);

    const result = StudentModel.delete(mssv);

    try {
      await fetch(`${GATEWAY_URL}/api/registrations/by-student/${mssv}`, {
        method: 'DELETE'
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Lỗi đồng bộ xóa sinh viên';
      console.error('[StudentService] Lỗi đồng bộ xóa sinh viên qua Gateway:', message);
    }

    return result.changes > 0;
  }
}

module.exports = StudentService;