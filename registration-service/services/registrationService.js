const RegistrationModel = require('../models/registrationModel');
const IRegistrationService = require('../interfaces/IRegistrationService');
const { AppError } = require('../errorHandler');

const STUDENT_SERVICE_URL = process.env.STUDENT_SERVICE_URL || 'http://localhost:3001';
const TOPIC_SERVICE_URL = process.env.TOPIC_SERVICE_URL || 'http://localhost:3002';

/**
 * @implements {IRegistrationService}
 */
class RegistrationService extends IRegistrationService {
  /**
   * @returns {Promise<import('../types/registrationTypes').RegistrationEntity[]>}
   */
  static async getAllRegistrations() {
    return RegistrationModel.findAll();
  }

  /**
   * @param {import('../types/registrationTypes').CreateRegistrationDTO} dto
   * @returns {Promise<import('../types/registrationTypes').RegistrationEntity>}
   */
  static async registerTopic(dto) {
    if (!dto.mssv || !dto.maDeTai) {
      throw new AppError('Thiếu thông tin mssv hoặc maDeTai', 400);
    }

    // 1. Kiểm tra sinh viên từ Student Service
    const studentRes = await fetch(`${STUDENT_SERVICE_URL}/students/${dto.mssv}`);
    if (!studentRes.ok) {
      throw new AppError('Sinh viên không tồn tại trong hệ thống', 400);
    }
    const studentData = await studentRes.json();

    // 2. Kiểm tra đề tài từ Topic Service
    const topicRes = await fetch(`${TOPIC_SERVICE_URL}/topics/${dto.maDeTai}`);
    if (!topicRes.ok) {
      throw new AppError('Đề tài không tồn tại trong hệ thống', 400);
    }
    const topicData = await topicRes.json();

    if (topicData.data.trangThai !== 'ConMo') {
      throw new AppError('Đề tài hiện không thể đăng ký', 400);
    }

    // 3. Khởi tạo đối tượng lưu CSDL
    /** @type {import('../types/registrationTypes').RegistrationEntity} */
    const record = {
      maDangKy: `DK${Date.now()}`,
      mssv: dto.mssv,
      tenSinhVien: studentData.data.hoTen,
      maDeTai: dto.maDeTai,
      tenDeTai: topicData.data.tenDeTai,
      ngayDangKy: new Date().toISOString(),
      trangThai: 'ThanhCong'
    };

    RegistrationModel.create(record);

    // 4. Cập nhật trạng thái đề tài sang 'DaDangKy'
    await fetch(`${TOPIC_SERVICE_URL}/topics/${dto.maDeTai}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trangThai: 'DaDangKy' })
    });

    return record;
  }
}

module.exports = RegistrationService;