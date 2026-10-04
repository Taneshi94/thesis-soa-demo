const StudentModel = require('../models/studentModel');
const IStudentService = require('../interfaces/IStudentService');
const { AppError } = require('../errorHandler');

/**
 * @implements {IStudentService}
 */
class StudentService extends IStudentService {
  /**
   * @returns {Promise<import('../types/studentTypes').StudentEntity[]>}
   */
  static async getAllStudents() {
    return StudentModel.findAll();
  }

  /**
   * @param {string} mssv
   * @returns {Promise<import('../types/studentTypes').StudentEntity>}
   */
  static async getStudentByMssv(mssv) {
    const student = StudentModel.findByMssv(mssv);
    if (!student) {
      throw new AppError(`Không tìm thấy sinh viên với mã ${mssv}`, 404);
    }
    return student;
  }

  /**
   * @param {import('../types/studentTypes').CreateStudentDTO} dto
   * @returns {Promise<import('../types/studentTypes').StudentEntity>}
   */
  static async createStudent(dto) {
    const existed = StudentModel.findByMssv(dto.mssv);
    if (existed) {
      throw new AppError(`Mã sinh viên ${dto.mssv} đã tồn tại`, 400);
    }
    StudentModel.create(dto);
    return dto;
  }
}

module.exports = StudentService;