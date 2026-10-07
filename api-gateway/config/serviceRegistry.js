const serviceRegistry = {
  students: {
    name: 'Student Service',
    target: process.env.STUDENT_SERVICE_URL || 'http://localhost:3001',
    healthUrl: process.env.STUDENT_HEALTH_URL || 'http://localhost:3001/health',
    gatewayUrl: 'http://localhost:3000/api/students',
    description: 'Dịch vụ Quản lý Sinh viên',
    status: 'UNKNOWN',
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
    target: process.env.TOPIC_SERVICE_URL || 'http://localhost:3002',
    healthUrl: process.env.TOPIC_HEALTH_URL || 'http://localhost:3002/health',
    gatewayUrl: 'http://localhost:3000/api/topics',
    description: 'Dịch vụ Quản lý Đề tài',
    status: 'UNKNOWN',
    endpoints: [
      { method: 'GET', path: '/api/topics', description: 'Lấy danh sách tất cả đề tài' },
      { method: 'GET', path: '/api/topics/:maDeTai', description: 'Lấy chi tiết đề tài theo mã' },
      { method: 'POST', path: '/api/topics', description: 'Tạo mới đề tài', body: ['maDeTai', 'tenDeTai', 'moTa', 'giangVienHuongDan'] },
      { method: 'PUT', path: '/api/topics/:maDeTai', description: 'Cập nhật thông tin đề tài', body: ['tenDeTai', 'moTa', 'giangVienHuongDan'] },
      { method: 'PATCH', path: '/api/topics/:maDeTai/status', description: 'Cập nhật riêng trạng thái đề tài', body: ['trangThai'] },
      { method: 'DELETE', path: '/api/topics/:maDeTai', description: 'Xóa đề tài' }
    ]
  },
  registrations: {
    name: 'Registration Service',
    target: process.env.REGISTRATION_SERVICE_URL || 'http://localhost:3003',
    healthUrl: process.env.REGISTRATION_HEALTH_URL || 'http://localhost:3003/health',
    gatewayUrl: 'http://localhost:3000/api/registrations',
    description: 'Dịch vụ Quản lý Đăng ký & Đồng bộ',
    status: 'UNKNOWN',
    endpoints: [
      { method: 'GET', path: '/api/registrations', description: 'Lấy danh sách tất cả phiếu đăng ký' },
      { method: 'GET', path: '/api/registrations/:maDangKy', description: 'Lấy chi tiết phiếu đăng ký theo mã' },
      { method: 'POST', path: '/api/registrations', description: 'Tạo mới phiếu đăng ký đề tài', body: ['mssv', 'maDeTai'] },
      { method: 'PUT', path: '/api/registrations/:maDangKy', description: 'Cập nhật phiếu đăng ký', body: ['mssv', 'maDeTai'] },
      { method: 'DELETE', path: '/api/registrations/:maDangKy', description: 'Hủy/Xóa phiếu đăng ký theo mã' },
      { method: 'PATCH', path: '/api/registrations/sync-student/:mssv', description: 'Đồng bộ thông tin tên sinh viên từ Student Service', body: ['tenSinhVien'] },
      { method: 'PATCH', path: '/api/registrations/sync-topic/:maDeTai', description: 'Đồng bộ thông tin tên đề tài từ Topic Service', body: ['tenDeTai'] },
      { method: 'DELETE', path: '/api/registrations/by-student/:mssv', description: 'Tự động xóa tất cả phiếu đăng ký khi sinh viên bị xóa' },
      { method: 'DELETE', path: '/api/registrations/by-topic/:maDeTai', description: 'Tự động xóa tất cả phiếu đăng ký khi đề tài bị xóa' }
    ]
  }
};

module.exports = serviceRegistry;