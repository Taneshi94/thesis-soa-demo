const Database = require('better-sqlite3');
const db = new Database('registration.db');

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

module.exports = db;