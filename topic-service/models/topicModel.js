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
    return db.prepare('SELECT * FROM DETAI').all();
  }

  /**
   * @param {string} maDeTai
   * @returns {import('../types/topicTypes').TopicEntity | undefined}
   */
  static findByMaDeTai(maDeTai) {
    return db.prepare('SELECT * FROM DETAI WHERE maDeTai = ?').get(maDeTai);
  }

  /**
   * @param {string} maDeTai
   * @param {'ConMo' | 'DaDangKy' | 'Dong'} trangThai
   */
  static updateStatus(maDeTai, trangThai) {
    const stmt = db.prepare('UPDATE DETAI SET trangThai = ? WHERE maDeTai = ?');
    return stmt.run(trangThai, maDeTai);
  }
}

module.exports = TopicModel;