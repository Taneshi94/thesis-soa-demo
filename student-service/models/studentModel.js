const IStudentModel = require('../interfaces/IStudentModel');
const db = require('../config/db');
const { AppError } = require('../errorHandler');

/**
 * @implements {IStudentModel}
 */
class StudentModel extends IStudentModel {
  /**
   * 1. Lấy tất cả sinh viên từ CSDL
   * @returns {import('../types/studentTypes').StudentEntity[]}
   */
  static findAll() {
    try {
      const stmt = db.prepare('SELECT * FROM SINHVIEN');
      return /** @type {import('../types/studentTypes').StudentEntity[]} */ (stmt.all());
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new AppError(`Lỗi truy vấn cơ sở dữ liệu: ${message}`, 500);
    }
  }

  /**
   * 2. Tìm sinh viên theo MSSV
   * @param {string} mssv
   * @returns {import('../types/studentTypes').StudentEntity | null}
   */
  static findByMssv(mssv) {
    try {
      const stmt = db.prepare('SELECT * FROM SINHVIEN WHERE mssv = ?');
      const row = stmt.get(mssv);
      return /** @type {import('../types/studentTypes').StudentEntity | null} */ (row || null);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new AppError(`Lỗi truy vấn sinh viên ${mssv}: ${message}`, 500);
    }
  }

  /**
   * 3. Thêm mới sinh viên vào CSDL
   * @param {import('../types/studentTypes').CreateStudentDTO} dto
   * @returns {import('better-sqlite3').RunResult}
   */
  static create(dto) {
    try {
      const stmt = db.prepare(`
        INSERT INTO SINHVIEN (mssv, hoTen, email, lop)
        VALUES (?, ?, ?, ?)
      `);
      return stmt.run(
        dto.mssv,
        dto.hoTen,
        dto.email || '',
        dto.lop || ''
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new AppError(`Lỗi khi tạo sinh viên trong CSDL: ${message}`, 500);
    }
  }

  /**
   * 4. Cập nhật thông tin sinh viên trong CSDL
   * @param {string} mssv
   * @param {import('../types/studentTypes').UpdateStudentDTO} dto
   * @returns {import('better-sqlite3').RunResult}
   */
  static update(mssv, dto) {
    try {
      const current = this.findByMssv(mssv);
      const hoTen = dto.hoTen !== undefined ? dto.hoTen : (current ? current.hoTen : '');
      const email = dto.email !== undefined ? dto.email : (current ? current.email : '');
      const lop = dto.lop !== undefined ? dto.lop : (current ? current.lop : '');

      const stmt = db.prepare(`
        UPDATE SINHVIEN
        SET hoTen = ?, email = ?, lop = ?
        WHERE mssv = ?
      `);
      return stmt.run(hoTen, email, lop, mssv);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new AppError(`Lỗi khi cập nhật sinh viên ${mssv} trong CSDL: ${message}`, 500);
    }
  }

  /**
   * 5. Xóa sinh viên khỏi CSDL
   * @param {string} mssv
   * @returns {import('better-sqlite3').RunResult}
   */
  static delete(mssv) {
    try {
      const stmt = db.prepare('DELETE FROM SINHVIEN WHERE mssv = ?');
      return stmt.run(mssv);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new AppError(`Lỗi khi xóa sinh viên ${mssv} khỏi CSDL: ${message}`, 500);
    }
  }
}

module.exports = StudentModel;