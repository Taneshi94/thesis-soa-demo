const db = require('../config/db');
const IStudentModel = require('../interfaces/IStudentModel');

/**
 * @implements {IStudentModel}
 */
class StudentModel extends IStudentModel {
  /**
   * @returns {import('../types/studentTypes').StudentEntity[]}
   */
  static findAll() {
    return db.prepare('SELECT * FROM SINHVIEN').all();
  }

  /**
   * @param {string} mssv
   * @returns {import('../types/studentTypes').StudentEntity | undefined}
   */
  static findByMssv(mssv) {
    return db.prepare('SELECT * FROM SINHVIEN WHERE mssv = ?').get(mssv);
  }

  /**
   * @param {import('../types/studentTypes').CreateStudentDTO} data
   */
  static create(data) {
    const stmt = db.prepare('INSERT INTO SINHVIEN (mssv, hoTen, lop, email) VALUES (?, ?, ?, ?)');
    return stmt.run(data.mssv, data.hoTen, data.lop, data.email);
  }
}

module.exports = StudentModel;