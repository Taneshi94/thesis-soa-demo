const StudentService = require('../services/studentService');
const { asyncHandler } = require('../errorHandler');

class StudentController {
  /**
   * 1. Lấy danh sách toàn bộ sinh viên
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static getAll = asyncHandler(async (req, res) => {
    const students = StudentService.getAllStudents();
    res.status(200).json({
      success: true,
      data: students
    });
  });

  /**
   * 2. Lấy thông tin sinh viên theo MSSV
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static getByMssv = asyncHandler(async (req, res) => {
    const mssv = String(req.params.mssv);
    const student = StudentService.getStudentByMssv(mssv);
    res.status(200).json({
      success: true,
      data: student
    });
  });

  /**
   * 3. Tạo mới sinh viên
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static create = asyncHandler(async (req, res) => {
    const newStudent = StudentService.createStudent(req.body);
    res.status(201).json({
      success: true,
      data: newStudent
    });
  });

  /**
   * 4. Cập nhật thông tin sinh viên
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static update = asyncHandler(async (req, res) => {
    const mssv = String(req.params.mssv);
    // Bắt buộc có await vì updateStudent là hàm async
    const updatedStudent = await StudentService.updateStudent(mssv, req.body);
    res.status(200).json({
      success: true,
      data: updatedStudent
    });
  });

  /**
   * 5. Xóa sinh viên
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static delete = asyncHandler(async (req, res) => {
    const mssv = String(req.params.mssv);
    // Bắt buộc có await vì deleteStudent là hàm async
    await StudentService.deleteStudent(mssv);
    res.status(200).json({
      success: true,
      message: `Xóa sinh viên ${mssv} thành công`
    });
  });
}

module.exports = StudentController;