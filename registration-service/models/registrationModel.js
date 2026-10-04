const db = require('../config/db');
const IRegistrationModel = require('../interfaces/IRegistrationModel');

/**
 * @implements {IRegistrationModel}
 */
class RegistrationModel extends IRegistrationModel {
  /**
   * @returns {import('../types/registrationTypes').RegistrationEntity[]}
   */
  static findAll() {
    return db.prepare('SELECT * FROM DANGKY').all();
  }

  /**
   * @param {import('../types/registrationTypes').RegistrationEntity} data
   */
  static create(data) {
    const stmt = db.prepare(`
      INSERT INTO DANGKY (maDangKy, mssv, tenSinhVien, maDeTai, tenDeTai, ngayDangKy, trangThai)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(
      data.maDangKy,
      data.mssv,
      data.tenSinhVien,
      data.maDeTai,
      data.tenDeTai,
      data.ngayDangKy,
      data.trangThai
    );
  }
}

module.exports = RegistrationModel;