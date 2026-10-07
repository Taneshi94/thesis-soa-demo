const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, '../topic.db');

/** @type {import('better-sqlite3').Database} */
const db = new Database(dbPath);

// Tối ưu hiệu năng WAL mode & bật kiểm tra khóa ngoại
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// 1. Tạo bảng DETAI
db.exec(`
  CREATE TABLE IF NOT EXISTS DETAI (
    maDeTai TEXT PRIMARY KEY,
    tenDeTai TEXT NOT NULL,
    moTa TEXT,
    giangVienHuongDan TEXT NOT NULL,
    trangThai INT NOT NULL CHECK(trangThai IN (0, 1, 2))
  );
`);

// 2. Seed data ban đầu (Khắc phục lỗi ts(2322) bằng Expression Casting)
const count = /** @type {{ count: number } | undefined} */ (
  db.prepare('SELECT COUNT(*) as count FROM DETAI').get()
);

if (count && count.count === 0) {
  const insertStmt = db.prepare(`
    INSERT INTO DETAI (maDeTai, tenDeTai, moTa, giangVienHuongDan, trangThai)
    VALUES (@maDeTai, @tenDeTai, @moTa, @giangVienHuongDan, @trangThai)
  `);

  const seedTransaction = db.transaction((topics) => {
    for (const topic of topics) {
      insertStmt.run(topic);
    }
  });

  seedTransaction([
    {
      maDeTai: 'DT001',
      tenDeTai: 'Xây dựng hệ thống Đồ án Tốt nghiệp theo SOA',
      moTa: 'Phân tích và triển khai kiến trúc SOA/Microservices với Express.js',
      giangVienHuongDan: 'TS. Nguyễn Văn C',
      trangThai: 0
    },
    {
      maDeTai: 'DT002',
      tenDeTai: 'Nghiên cứu ứng dụng Microservices với Node.js',
      moTa: 'Tìm hiểu cơ chế điều hướng API Gateway và liên tiếp dữ liệu giữa các dịch vụ',
      giangVienHuongDan: 'ThS. Lê Thị D',
      trangThai: 0
    }
  ]);
}

module.exports = db;