const db = require('../config/db');
const IRegistrationModel = require('../interfaces/IRegistrationModel');
const { AppError } = require('../errorHandler');

/**
 * @typedef {import('../types/registrationTypes').RegistrationEntity} RegistrationEntity
 * @typedef {import('better-sqlite3').RunResult} RunResult
 */

class RegistrationModel extends IRegistrationModel {
  /**
   * 1. Lấy tất cả bản ghi đăng ký
   * @returns {RegistrationEntity[]}
   */
  static findAll() {
    try {
      return /** @type {RegistrationEntity[]} */ (
        db.prepare('SELECT * FROM DANGKY').all()
      );
    } catch (error) {
      throw new AppError(
        error instanceof Error ? error.message : 'Lỗi truy vấn cơ sở dữ liệu khi lấy danh sách đăng ký',
        500
      );
    }
  }

  /**
   * 2. Lấy thông tin 1 phiếu đăng ký theo maDangKy
   * @param {string} maDangKy
   * @returns {RegistrationEntity | undefined}
   */
  static findByMaDangKy(maDangKy) {
    try {
      return /** @type {RegistrationEntity | undefined} */ (
        db.prepare('SELECT * FROM DANGKY WHERE maDangKy = ?').get(maDangKy)
      );
    } catch (error) {
      throw new AppError(
        error instanceof Error ? error.message : 'Lỗi truy vấn cơ sở dữ liệu khi lấy thông tin đăng ký',
        500
      );
    }
  }

  /**
   * 3. Tạo phiếu đăng ký mới
   * @param {RegistrationEntity} data
   * @returns {RunResult}
   */
  static create(data) {
    try {
      const stmt = db.prepare(`
        INSERT INTO DANGKY (maDangKy, mssv, tenSinhVien, maDeTai, tenDeTai, ngayDangKy)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      return stmt.run(
        data.maDangKy,
        data.mssv,
        data.tenSinhVien,
        data.maDeTai,
        data.tenDeTai,
        data.ngayDangKy
      );
    } catch (error) {
      throw new AppError(
        error instanceof Error ? error.message : 'Lỗi cơ sở dữ liệu khi tạo phiếu đăng ký mới',
        500
      );
    }
  }

  /**
   * 4. Cập nhật thông tin phiếu đăng ký
   * @param {string} maDangKy
   * @param {RegistrationEntity} data
   * @returns {RunResult}
   */
  static update(maDangKy, data) {
    try {
      const stmt = db.prepare(`
        UPDATE DANGKY
        SET mssv = ?, tenSinhVien = ?, maDeTai = ?, tenDeTai = ?, ngayDangKy = ?
        WHERE maDangKy = ?
      `);
      return stmt.run(
        data.mssv,
        data.tenSinhVien,
        data.maDeTai,
        data.tenDeTai,
        data.ngayDangKy,
        maDangKy
      );
    } catch (error) {
      throw new AppError(
        error instanceof Error ? error.message : 'Lỗi cơ sở dữ liệu khi cập nhật phiếu đăng ký',
        500
      );
    }
  }

  /**
   * 5. Đồng bộ tên sinh viên
   * @param {string} mssv
   * @param {string} tenSinhVien
   * @returns {RunResult}
   */
  static updateStudentInfo(mssv, tenSinhVien) {
    try {
      return db.prepare('UPDATE DANGKY SET tenSinhVien = ? WHERE mssv = ?').run(tenSinhVien, mssv);
    } catch (error) {
      throw new AppError(
        error instanceof Error ? error.message : 'Lỗi cơ sở dữ liệu khi đồng bộ tên sinh viên',
        500
      );
    }
  }

  /**
   * 6. Đồng bộ tên đề tài
   * @param {string} maDeTai
   * @param {string} tenDeTai
   * @returns {RunResult}
   */
  static updateTopicInfo(maDeTai, tenDeTai) {
    try {
      return db.prepare('UPDATE DANGKY SET tenDeTai = ? WHERE maDeTai = ?').run(tenDeTai, maDeTai);
    } catch (error) {
      throw new AppError(
        error instanceof Error ? error.message : 'Lỗi cơ sở dữ liệu khi đồng bộ tên đề tài',
        500
      );
    }
  }

  /**
   * 7. Xóa đăng ký theo maDangKy
   * @param {string} maDangKy
   * @returns {RunResult}
   */
  static delete(maDangKy) {
    try {
      return db.prepare('DELETE FROM DANGKY WHERE maDangKy = ?').run(maDangKy);
    } catch (error) {
      throw new AppError(
        error instanceof Error ? error.message : 'Lỗi cơ sở dữ liệu khi xóa phiếu đăng ký',
        500
      );
    }
  }

  /**
   * 8. Xóa đăng ký theo MSSV (Cascade Delete)
   * @param {string} mssv
   * @returns {RunResult}
   */
  static deleteByMssv(mssv) {
    try {
      return db.prepare('DELETE FROM DANGKY WHERE mssv = ?').run(mssv);
    } catch (error) {
      throw new AppError(
        error instanceof Error ? error.message : 'Lỗi cơ sở dữ liệu khi xóa đăng ký theo MSSV',
        500
      );
    }
  }

  /**
   * 9. Xóa đăng ký theo mã đề tài (Cascade Delete)
   * @param {string} maDeTai
   * @returns {RunResult}
   */
  static deleteByMaDeTai(maDeTai) {
    try {
      return db.prepare('DELETE FROM DANGKY WHERE maDeTai = ?').run(maDeTai);
    } catch (error) {
      throw new AppError(
        error instanceof Error ? error.message : 'Lỗi cơ sở dữ liệu khi xóa đăng ký theo mã đề tài',
        500
      );
    }
  }
}

module.exports = RegistrationModel;