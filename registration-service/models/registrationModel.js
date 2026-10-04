/** @type {import('better-sqlite3').Database} */
const db = require('../config/db');
const IRegistrationModel = require('../interfaces/IRegistrationModel');

class RegistrationModel extends IRegistrationModel {
  /**
   * @returns {import('../types/registrationTypes').RegistrationEntity[]}
   */
  static findAll() {
    return /** @type {import('../types/registrationTypes').RegistrationEntity[]} */ (
      db.prepare('SELECT * FROM DANGKY').all()
    );
  }

  /**
   * @param {string} maDangKy
   * @returns {import('../types/registrationTypes').RegistrationEntity | undefined}
   */
  static findByMaDangKy(maDangKy) {
    return /** @type {import('../types/registrationTypes').RegistrationEntity | undefined} */ (
      db.prepare('SELECT * FROM DANGKY WHERE maDangKy = ?').get(maDangKy)
    );
  }

  /**
   * @param {string} mssv
   * @returns {import('../types/registrationTypes').RegistrationEntity[]}
   */
  static findByMssv(mssv) {
    return /** @type {import('../types/registrationTypes').RegistrationEntity[]} */ (
      db.prepare('SELECT * FROM DANGKY WHERE mssv = ?').all(mssv)
    );
  }

  /**
   * @param {import('../types/registrationTypes').CreateRegistrationDTO} data
   */
  static create(data) {
    const stmt = db.prepare(`
      INSERT INTO DANGKY (maDangKy, mssv, tenSinhVien, maDeTai, tenDeTai, ngayDangKy, trangThai)
      VALUES (@maDangKy, @mssv, @tenSinhVien, @maDeTai, @tenDeTai, @ngayDangKy, @trangThai)
    `);
    return stmt.run(data);
  }

  /**
   * @param {string} maDangKy
   * @param {import('../types/registrationTypes').UpdateRegistrationDTO} data
   */
  static update(maDangKy, data) {
    const stmt = db.prepare(`
      UPDATE DANGKY
      SET mssv = @mssv, tenSinhVien = @tenSinhVien, maDeTai = @maDeTai, tenDeTai = @tenDeTai, ngayDangKy = @ngayDangKy, trangThai = @trangThai
      WHERE maDangKy = @maDangKy
    `);
    return stmt.run({ maDangKy, ...data });
  }

  /**
 * Cập nhật tên sinh viên trên tất cả các phiếu đăng ký của sinh viên đó
 * @param {string} mssv
 * @param {string} tenSinhVien
 */
  static updateStudentInfo(mssv, tenSinhVien) {
    const stmt = db.prepare('UPDATE REGISTRATION SET tenSinhVien = ? WHERE mssv = ?');
    return stmt.run(tenSinhVien, mssv);
  }

  /**
   * Cập nhật tên đề tài trên tất cả các phiếu đăng ký liên quan đến đề tài đó
   * @param {string} maDeTai
   * @param {string} tenDeTai
   */
  static updateTopicInfo(maDeTai, tenDeTai) {
    const stmt = db.prepare('UPDATE REGISTRATION SET tenDeTai = ? WHERE maDeTai = ?');
    return stmt.run(tenDeTai, maDeTai);
  }

  /**
   * @param {string} maDangKy
   */
  static delete(maDangKy) {
    return db.prepare('DELETE FROM DANGKY WHERE maDangKy = ?').run(maDangKy);
  }
}

module.exports = RegistrationModel;