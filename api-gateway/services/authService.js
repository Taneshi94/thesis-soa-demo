const jwt = require('jsonwebtoken');
const IAuthService = require('../interfaces/IAuthService');
const { AppError } = require('../errorHandler');

/**
 * @implements {IAuthService}
 */
class AuthService extends IAuthService {
  /**
   * @param {import('../types/authTypes').LoginDTO} dto
   * @returns {Promise<import('../types/authTypes').LoginResponseDTO>}
   */
  static async login(dto) {
    const secret = process.env.JWT_SECRET || 'thesis_soa_secret_key_2026';

    if (dto.username === 'student' && dto.password === '123456') {
      const token = jwt.sign({ id: 'SV001', role: 'SINHVIEN' }, secret, { expiresIn: '2h' });
      return { success: true, message: 'Đăng nhập thành công', token, role: 'SINHVIEN' };
    }

    if (dto.username === 'admin' && dto.password === '123456') {
      const token = jwt.sign({ id: 'ADMIN01', role: 'QUANLY' }, secret, { expiresIn: '2h' });
      return { success: true, message: 'Đăng nhập thành công', token, role: 'QUANLY' };
    }

    throw new AppError('Tài khoản hoặc mật khẩu không chính xác', 401);
  }
}

module.exports = AuthService;