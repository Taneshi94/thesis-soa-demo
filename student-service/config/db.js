const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, '../student.db');

/** @type {import('better-sqlite3').Database} */
const db = new Database(dbPath);

// Tối ưu hiệu năng & bật khóa ngoại
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// 1. Tạo bảng SINHVIEN
db.exec(`
  CREATE TABLE IF NOT EXISTS SINHVIEN (
    mssv TEXT PRIMARY KEY,
    hoTen TEXT NOT NULL,
    lop TEXT NOT NULL,
    email TEXT NOT NULL
  );
`);

// 2. Seed data ban đầu nếu CSDL trống
const count = /** @type {{ count: number } | undefined} */ (
  db.prepare('SELECT COUNT(*) as count FROM SINHVIEN').get()
);

if (count && count.count === 0) {
  const insertStmt = db.prepare(
    'INSERT INTO SINHVIEN (mssv, hoTen, lop, email) VALUES (@mssv, @hoTen, @lop, @email)'
  );

  const seedTransaction = db.transaction((students) => {
    for (const student of students) {
      insertStmt.run(student);
    }
  });

  seedTransaction([
    { mssv: 'SV001', hoTen: 'Nguyễn Văn A', lop: 'CNTT-K46', email: 'a@qnu.edu.vn' },
    { mssv: 'SV002', hoTen: 'Trần Thị B', lop: 'CNTT-K46', email: 'b@qnu.edu.vn' }
  ]);
}

module.exports = db;