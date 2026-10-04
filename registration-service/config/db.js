const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, '../registration.db');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// 1. Tạo bảng DANGKY
db.exec(`
  CREATE TABLE IF NOT EXISTS DANGKY (
    maDangKy TEXT PRIMARY KEY,
    mssv TEXT NOT NULL,
    tenSinhVien TEXT NOT NULL,
    maDeTai TEXT NOT NULL,
    tenDeTai TEXT NOT NULL,
    ngayDangKy TEXT NOT NULL,
    trangThai TEXT NOT NULL
  );
`);

// 2. Seed data
const count = /** @type {{ count: number } | undefined} */ (
  db.prepare('SELECT COUNT(*) as count FROM DANGKY').get()
);

if (count && count.count === 0) {
  const insertStmt = db.prepare(`
    INSERT INTO DANGKY (maDangKy, mssv, tenSinhVien, maDeTai, tenDeTai, ngayDangKy, trangThai)
    VALUES (@maDangKy, @mssv, @tenSinhVien, @maDeTai, @tenDeTai, @ngayDangKy, @trangThai)
  `);

  const seedTransaction = db.transaction((items) => {
    for (const item of items) {
      insertStmt.run(item);
    }
  });

  seedTransaction([
    {
      maDangKy: 'DK001',
      mssv: 'SV001',
      tenSinhVien: 'Nguyễn Văn A',
      maDeTai: 'DT001',
      tenDeTai: 'Xây dựng hệ thống Microservices với Express.js',
      ngayDangKy: '2026-10-01',
      trangThai: 'APPROVED'
    }
  ]);
}

// Xuất trực tiếp đối tượng db
module.exports = db;