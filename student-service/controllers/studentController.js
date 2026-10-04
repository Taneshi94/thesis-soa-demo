const StudentService = require('../services/studentService');
const { asyncHandler } = require('../errorHandler');

exports.getAllStudents = asyncHandler(async (req, res) => {
  const students = await StudentService.getAllStudents();
  res.json({ success: true, data: students });
});

exports.getStudentByMssv = asyncHandler(async (req, res) => {
  const { mssv } = req.params;
  const student = await StudentService.getStudentByMssv(mssv);
  res.json({ success: true, data: student });
});

exports.createStudent = asyncHandler(async (req, res) => {
  // req.body đóng vai trò là CreateStudentDTO
  const newStudent = await StudentService.createStudent(req.body);
  res.status(201).json({ success: true, message: 'Thêm sinh viên thành công', data: newStudent });
});