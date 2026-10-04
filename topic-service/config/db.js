const Database = require('better-sqlite3');
const db = new Database('topic.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS DETAI (
    maDeTai TEXT PRIMARY KEY,
    tenDeTai TEXT NOT NULL,
    giangVienHD TEXT NOT NULL,
    trangThai TEXT NOT NULL CHECK(trangThai IN ('ConMo', 'DaDangKy', 'Dong'))
  );
`);

const count = db.prepare('SELECT COUNT(*) as count FROM DETAI').get();
if (count.count === 0) {
  const insert = db.prepare('INSERT INTO DETAI (maDeTai, tenDeTai, giangVienHD, trangThai) VALUES (?, ?, ?, ?)');
  insert.run('DT001', 'Xây dựng hệ thống Đồ án Tốt nghiệp theo SOA', 'TS. Nguyễn Văn C', 'ConMo');
  insert.run('DT002', 'Nghiên cứu ứng dụng Microservices với Node.js', 'ThS. Lê Thị D', 'ConMo');
}

module.exports = db;