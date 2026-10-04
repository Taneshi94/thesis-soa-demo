const Database = require('better-sqlite3');
const db = new Database('student.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS SINHVIEN (
    mssv TEXT PRIMARY KEY,
    hoTen TEXT NOT NULL,
    lop TEXT NOT NULL,
    email TEXT NOT NULL
  );
`);

const count = db.prepare('SELECT COUNT(*) as count FROM SINHVIEN').get();
if (count.count === 0) {
  const insert = db.prepare('INSERT INTO SINHVIEN (mssv, hoTen, lop, email) VALUES (?, ?, ?, ?)');
  insert.run('SV001', 'Nguyễn Văn A', 'CNTT-K46', 'a@qnu.edu.vn');
  insert.run('SV002', 'Trần Thị B', 'CNTT-K46', 'b@qnu.edu.vn');
}

module.exports = db;