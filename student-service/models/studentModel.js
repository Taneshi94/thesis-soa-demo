/** @type {import('better-sqlite3').Database} */
const db = require('../config/db');
const IStudentModel = require('../interfaces/IStudentModel');

class StudentModel extends IStudentModel {
  /**
   * @returns {import('../types/studentTypes').StudentEntity[]}
   */
  static findAll() {
    return /** @type {import('../types/studentTypes').StudentEntity[]} */ (
      db.prepare('SELECT * FROM SINHVIEN').all()
    );
  }

  /**
   * @param {string} mssv
   * @returns {import('../types/studentTypes').StudentEntity | undefined}
   */
  static findByMssv(mssv) {
    return /** @type {import('../types/studentTypes').StudentEntity | undefined} */ (
      db.prepare('SELECT * FROM SINHVIEN WHERE mssv = ?').get(mssv)
    );
  }

  /**
   * @param {import('../types/studentTypes').CreateStudentDTO} data
   */
  static create(data) {
    const stmt = db.prepare(
      'INSERT INTO SINHVIEN (mssv, hoTen, lop, email) VALUES (@mssv, @hoTen, @lop, @email)'
    );
    return stmt.run(data);
  }

  /**
   * @param {string} mssv
   * @param {import('../types/studentTypes').UpdateStudentDTO} data
   */
  static update(mssv, data) {
    const stmt = db.prepare(
      'UPDATE SINHVIEN SET hoTen = @hoTen, lop = @lop, email = @email WHERE mssv = @mssv'
    );
    return stmt.run({ mssv, ...data });
  }

  /**
   * @param {string} mssv
   */
  static delete(mssv) {
    return db.prepare('DELETE FROM SINHVIEN WHERE mssv = ?').run(mssv);
  }
}

module.exports = StudentModel;