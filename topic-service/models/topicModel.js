const ITopicModel = require('../interfaces/ITopicModel');
const { AppError } = require('../errorHandler');
/** @type {import('better-sqlite3').Database} */
const db = require('../config/db');

/**
 * @typedef {import('../types/topicTypes').TopicEntity} TopicEntity
 * @typedef {import('../types/topicTypes').UpdateTopicDTO} UpdateTopicDTO
 * @typedef {import('better-sqlite3').RunResult} RunResult
 */

/**
 * @implements {ITopicModel}
 */
class TopicModel extends ITopicModel {
  /**
   * 1. Lấy danh sách tất cả đề tài từ CSDL
   * @returns {TopicEntity[]}
   */
  static findAll() {
    try {
      const stmt = db.prepare('SELECT * FROM DETAI');
      return /** @type {TopicEntity[]} */ (stmt.all());
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new AppError(`Lỗi truy vấn cơ sở dữ liệu: ${message}`, 500);
    }
  }

  /**
   * 2. Tìm đề tài theo mã đề tài
   * @param {string} maDeTai
   * @returns {TopicEntity | null}
   */
  static findByMaDeTai(maDeTai) {
    try {
      const stmt = db.prepare('SELECT * FROM DETAI WHERE maDeTai = ?');
      const row = stmt.get(maDeTai);
      return /** @type {TopicEntity | null} */ (row || null);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new AppError(`Lỗi truy vấn đề tài ${maDeTai}: ${message}`, 500);
    }
  }

  /**
   * 3. Thêm mới đề tài vào CSDL
   * @param {TopicEntity} data
   * @returns {RunResult}
   */
  static create(data) {
    try {
      const stmt = db.prepare(`
        INSERT INTO DETAI (maDeTai, tenDeTai, moTa, giangVienHuongDan, trangThai)
        VALUES (@maDeTai, @tenDeTai, @moTa, @giangVienHuongDan, @trangThai)
      `);
      return stmt.run({
        maDeTai: data.maDeTai,
        tenDeTai: data.tenDeTai,
        moTa: data.moTa || '',
        giangVienHuongDan: data.giangVienHuongDan || '',
        trangThai: data.trangThai
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new AppError(`Lỗi khi tạo đề tài trong CSDL: ${message}`, 500);
    }
  }

  /**
   * 4. Cập nhật thông tin chung đề tài (KHÔNG cập nhật trạng thái)
   * @param {string} maDeTai
   * @param {UpdateTopicDTO} data
   * @returns {RunResult}
   */
  static update(maDeTai, data) {
    try {
      const current = this.findByMaDeTai(maDeTai);
      const tenDeTai = data.tenDeTai !== undefined ? data.tenDeTai : (current ? current.tenDeTai : '');
      const moTa = data.moTa !== undefined ? data.moTa : (current ? current.moTa : '');
      const giangVienHuongDan = data.giangVienHuongDan !== undefined ? data.giangVienHuongDan : (current ? current.giangVienHuongDan : '');

      const stmt = db.prepare(`
        UPDATE DETAI 
        SET tenDeTai = @tenDeTai, moTa = @moTa, giangVienHuongDan = @giangVienHuongDan
        WHERE maDeTai = @maDeTai
      `);
      return stmt.run({ maDeTai, tenDeTai, moTa, giangVienHuongDan });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new AppError(`Lỗi khi cập nhật đề tài ${maDeTai} trong CSDL: ${message}`, 500);
    }
  }

  /**
   * 5. Xóa đề tài khỏi CSDL
   * @param {string} maDeTai
   * @returns {RunResult}
   */
  static delete(maDeTai) {
    try {
      return db.prepare('DELETE FROM DETAI WHERE maDeTai = ?').run(maDeTai);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new AppError(`Lỗi khi xóa đề tài ${maDeTai} khỏi CSDL: ${message}`, 500);
    }
  }

  /**
   * 6. Cập nhật duy nhất thuộc tính trangThai của đề tài
   * @param {string} maDeTai
   * @param {number | string} trangThai
   * @returns {RunResult}
   */
  static updateStatus(maDeTai, trangThai) {
    try {
      const stmt = db.prepare('UPDATE DETAI SET trangThai = ? WHERE maDeTai = ?');
      return stmt.run(trangThai, maDeTai);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new AppError(`Lỗi khi cập nhật trạng thái đề tài ${maDeTai} trong CSDL: ${message}`, 500);
    }
  }
}

module.exports = TopicModel;