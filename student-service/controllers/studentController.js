const StudentService = require('../services/studentService');

class StudentController {
  /**
   * Lấy danh sách toàn bộ sinh viên
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static getAll(req, res) {
    try {
      const students = StudentService.getAllStudents();
      return res.status(200).json({
        success: true,
        data: students
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Lỗi hệ thống khi lấy danh sách sinh viên';
      return res.status(500).json({
        success: false,
        message
      });
    }
  }

  /**
   * Lấy thông tin sinh viên theo MSSV
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static getByMssv(req, res) {
    try {
      const mssv = String(req.params.mssv);
      const student = StudentService.getStudentByMssv(mssv);
      return res.status(200).json({
        success: true,
        data: student
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Không tìm thấy sinh viên';
      return res.status(404).json({
        success: false,
        message
      });
    }
  }

  /**
   * Tạo mới sinh viên
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static create(req, res) {
    try {
      const newStudent = StudentService.createStudent(req.body);
      return res.status(201).json({
        success: true,
        data: newStudent
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Lỗi khi tạo sinh viên';
      return res.status(400).json({
        success: false,
        message
      });
    }
  }

  /**
   * Cập nhật thông tin sinh viên
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static update(req, res) {
    try {
      const mssv = String(req.params.mssv);
      const updatedStudent = StudentService.updateStudent(mssv, req.body);
      return res.status(200).json({
        success: true,
        data: updatedStudent
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Lỗi khi cập nhật sinh viên';
      return res.status(400).json({
        success: false,
        message
      });
    }
  }

  /**
   * Xóa sinh viên
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static delete(req, res) {
    try {
      const mssv = String(req.params.mssv);
      StudentService.deleteStudent(mssv);
      return res.status(200).json({
        success: true,
        message: `Xóa sinh viên ${mssv} thành công`
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Lỗi khi xóa sinh viên';
      return res.status(400).json({
        success: false,
        message
      });
    }
  }
}

module.exports = StudentController;