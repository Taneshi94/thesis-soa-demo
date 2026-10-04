const serviceRegistry = {
  students: {
    name: 'Student Service',
    target: 'http://localhost:3001',
    description: 'Dịch vụ Quản lý Sinh viên',
    status: 'UNKNOWN',
    healthUrl: 'http://localhost:3001/api/students',
    endpoints: [
      { method: 'GET', path: '/api/students', description: 'Lấy danh sách tất cả sinh viên' },
      { method: 'GET', path: '/api/students/:mssv', description: 'Lấy thông tin sinh viên theo MSSV' },
      { method: 'POST', path: '/api/students', description: 'Tạo mới sinh viên', body: ['mssv', 'hoTen', 'email', 'soDienThoai'] },
      { method: 'PUT', path: '/api/students/:mssv', description: 'Cập nhật thông tin sinh viên', body: ['hoTen', 'email', 'soDienThoai'] },
      { method: 'DELETE', path: '/api/students/:mssv', description: 'Xóa sinh viên' }
    ]
  },
  topics: {
    name: 'Topic Service',
    target: 'http://localhost:3002',
    description: 'Dịch vụ Quản lý Đề tài',
    status: 'UNKNOWN',
    healthUrl: 'http://localhost:3002/api/topics',
    endpoints: [
      { method: 'GET', path: '/api/topics', description: 'Lấy danh sách tất cả đề tài' },
      { method: 'GET', path: '/api/topics/:maDeTai', description: 'Lấy chi tiết đề tài theo mã' },
      { method: 'POST', path: '/api/topics', description: 'Tạo mới đề tài', body: ['maDeTai', 'tenDeTai', 'moTa', 'giangVienHuongDan'] },
      { method: 'PUT', path: '/api/topics/:maDeTai', description: 'Cập nhật thông tin đề tài', body: ['tenDeTai', 'moTa', 'giangVienHuongDan', 'trangThai'] },
      { method: 'PATCH', path: '/api/topics/:maDeTai/status', description: 'Cập nhật riêng trạng thái đề tài', body: ['trangThai'] },
      { method: 'DELETE', path: '/api/topics/:maDeTai', description: 'Xóa đề tài' }
    ]
  },
  registrations: {
    name: 'Registration Service',
    target: 'http://localhost:3003',
    description: 'Dịch vụ Quản lý Đăng ký & Đồng bộ',
    status: 'UNKNOWN',
    healthUrl: 'http://localhost:3003/api/registrations',
    endpoints: [
      { method: 'GET', path: '/api/registrations', description: 'Lấy danh sách tất cả phiếu đăng ký' },
      { method: 'GET', path: '/api/registrations/:id', description: 'Lấy chi tiết phiếu đăng ký theo ID' },
      { method: 'POST', path: '/api/registrations', description: 'Tạo mới phiếu đăng ký đề tài', body: ['mssv', 'maDeTai'] },
      { method: 'DELETE', path: '/api/registrations/:id', description: 'Hủy/Xóa phiếu đăng ký' }
    ]
  }
};

module.exports = serviceRegistry;