const IStudentService = require('../interfaces/IStudentService');
const StudentModel = require('../models/studentModel');

// Port của API Gateway
const GATEWAY_URL = 'http://localhost:3000';

/**
 * @implements {IStudentService}
 */
class StudentService extends IStudentService {
  /**
   * @returns {import('../types/studentTypes').StudentEntity[]}
   */
  static getAllStudents() {
    return StudentModel.findAll();
  }

  /**
   * @param {string} mssv
   * @returns {import('../types/studentTypes').StudentEntity}
   */
  static getStudentByMssv(mssv) {
    const student = StudentModel.findByMssv(mssv);
    if (!student) {
      throw new Error(`Không tìm thấy sinh viên với MSSV: ${mssv}`);
    }
    return student;
  }

  /**
   * @param {import('../types/studentTypes').CreateStudentDTO} dto
   * @returns {import('../types/studentTypes').StudentEntity}
   */
  static createStudent(dto) {
    const existing = StudentModel.findByMssv(dto.mssv);
    if (existing) {
      throw new Error(`Sinh viên với MSSV ${dto.mssv} đã tồn tại!`);
    }

    StudentModel.create(dto);
    
    const created = StudentModel.findByMssv(dto.mssv);
    if (!created) {
      throw new Error('Lỗi trong quá trình tạo sinh viên');
    }
    return created;
  }

  /**
   * @param {string} mssv
   * @param {import('../types/studentTypes').UpdateStudentDTO} dto
   * @returns {Promise<import('../types/studentTypes').StudentEntity>}
   */
  static async updateStudent(mssv, dto) {
    const existing = this.getStudentByMssv(mssv); // Lấy thông tin hiện tại & kiểm tra tồn tại

    StudentModel.update(mssv, dto);

    const updated = StudentModel.findByMssv(mssv);
    if (!updated) {
      throw new Error('Lỗi trong quá trình cập nhật sinh viên');
    }

    // Tự động đồng bộ tên sinh viên sang Registration Service qua API Gateway nếu họ tên bị thay đổi
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
   * @param {string} mssv
   * @returns {boolean}
   */
  static deleteStudent(mssv) {
    this.getStudentByMssv(mssv); // Kiểm tra tồn tại trước
    const result = StudentModel.delete(mssv);
    return result.changes > 0;
  }
}

module.exports = StudentService;