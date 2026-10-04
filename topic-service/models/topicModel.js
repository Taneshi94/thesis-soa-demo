/** @type {import('better-sqlite3').Database} */
const db = require('../config/db');
const ITopicModel = require('../interfaces/ITopicModel');

/**
 * @implements {ITopicModel}
 */
class TopicModel extends ITopicModel {
  /**
   * @returns {import('../types/topicTypes').TopicEntity[]}
   */
  static findAll() {
    return /** @type {import('../types/topicTypes').TopicEntity[]} */ (
      db.prepare('SELECT * FROM DETAI').all()
    );
  }

  /**
   * @param {string} maDeTai
   * @returns {import('../types/topicTypes').TopicEntity | undefined}
   */
  static findByMaDeTai(maDeTai) {
    return /** @type {import('../types/topicTypes').TopicEntity | undefined} */ (
      db.prepare('SELECT * FROM DETAI WHERE maDeTai = ?').get(maDeTai)
    );
  }

  /**
   * @param {import('../types/topicTypes').CreateTopicDTO} data
   */
  static create(data) {
    const stmt = db.prepare(`
      INSERT INTO DETAI (maDeTai, tenDeTai, moTa, giangVienHuongDan, trangThai)
      VALUES (@maDeTai, @tenDeTai, @moTa, @giangVienHuongDan, @trangThai)
    `);
    return stmt.run(data);
  }

  /**
   * @param {string} maDeTai
   * @param {import('../types/topicTypes').UpdateTopicDTO} data
   */
  static update(maDeTai, data) {
    const stmt = db.prepare(`
      UPDATE DETAI 
      SET tenDeTai = @tenDeTai, moTa = @moTa, giangVienHuongDan = @giangVienHuongDan, trangThai = @trangThai
      WHERE maDeTai = @maDeTai
    `);
    return stmt.run({ maDeTai, ...data });
  }

  /**
   * @param {string} maDeTai
   */
  static delete(maDeTai) {
    return db.prepare('DELETE FROM DETAI WHERE maDeTai = ?').run(maDeTai);
  }

  /**
   * Cập nhật duy nhất thuộc tính trangThai của đề tài
   * @param {string} maDeTai
   * @param {string} trangThai
   */
  static updateStatus(maDeTai, trangThai) {
    const stmt = db.prepare('UPDATE DETAI SET trangThai = ? WHERE maDeTai = ?');
    return stmt.run(trangThai, maDeTai);
  }
}

module.exports = TopicModel;