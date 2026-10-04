const RegistrationModel = require('../models/registrationModel');
const IRegistrationService = require('../interfaces/IRegistrationService');
const { AppError } = require('../errorHandler');

const STUDENT_SERVICE_URL = process.env.STUDENT_SERVICE_URL || 'http://localhost:3001';
const TOPIC_SERVICE_URL = process.env.TOPIC_SERVICE_URL || 'http://localhost:3002';

/**
 * Định nghĩa kiểu dữ liệu phản hồi từ Student Service
 * @typedef {Object} StudentApiResponse
 * @property {boolean} success
 * @property {{ mssv: string, hoTen: string, lop: string, email: string }} data
 */

/**
 * Định nghĩa kiểu dữ liệu phản hồi từ Topic Service
 * @typedef {Object} TopicApiResponse
 * @property {boolean} success
 * @property {{ maDeTai: string, tenDeTai: string, moTa: string, giangVienHuongDan: string, trangThai: string }} data
 */

/**
 * @implements {IRegistrationService}
 */
class RegistrationService extends IRegistrationService {
  /**
   * Lấy danh sách tất cả các phiếu đăng ký
   * @returns {import('../types/registrationTypes').RegistrationEntity[]}
   */
  static getAllRegistrations() {
    return RegistrationModel.findAll();
  }

  /**
   * Lấy chi tiết phiếu đăng ký theo mã
   * @param {string} maDangKy
   * @returns {import('../types/registrationTypes').RegistrationEntity}
   */
  static getByMaDangKy(maDangKy) {
    const registration = RegistrationModel.findByMaDangKy(maDangKy);
    if (!registration) {
      throw new AppError(`Không tìm thấy đăng ký với mã: ${maDangKy}`, 404);
    }
    return registration;
  }

  /**
   * Đăng ký đề tài (Gọi API liên dịch vụ tới Student & Topic Services)
   * @param {import('../types/registrationTypes').CreateRegistrationDTO} dto
   * @returns {Promise<import('../types/registrationTypes').RegistrationEntity>}
   */
  static async registerTopic(dto) {
    if (!dto.mssv || !dto.maDeTai) {
      throw new AppError('Thiếu thông tin mssv hoặc maDeTai', 400);
    }

    // 1. Kiểm tra sinh viên từ Student Service
    /** @type {StudentApiResponse} */
    let studentData;
    try {
      const studentRes = await fetch(`${STUDENT_SERVICE_URL}/api/students/${dto.mssv}`);
      if (!studentRes.ok) {
        throw new AppError(`Sinh viên ${dto.mssv} không tồn tại trong hệ thống`, 404);
      }
      studentData = /** @type {StudentApiResponse} */ (await studentRes.json());
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Không thể kết nối tới Student Service', 500);
    }

    // 2. Kiểm tra đề tài từ Topic Service
    /** @type {TopicApiResponse} */
    let topicData;
    try {
      const topicRes = await fetch(`${TOPIC_SERVICE_URL}/api/topics/${dto.maDeTai}`);
      if (!topicRes.ok) {
        throw new AppError(`Đề tài ${dto.maDeTai} không tồn tại trong hệ thống`, 404);
      }
      topicData = /** @type {TopicApiResponse} */ (await topicRes.json());
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Không thể kết nối tới Topic Service', 500);
    }

    if (topicData.data.trangThai !== 'ConMo') {
      throw new AppError('Đề tài hiện không thể đăng ký (Đã đóng hoặc đã có sinh viên đăng ký)', 400);
    }

    // 3. Khởi tạo đối tượng và lưu CSDL
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

    // 4. Cập nhật trạng thái đề tài sang 'DaDangKy' thông qua Topic Service
    try {
      await fetch(`${TOPIC_SERVICE_URL}/api/topics/${dto.maDeTai}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...topicData.data,
          trangThai: 'DaDangKy'
        })
      });
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái đề tài tại Topic Service:', error);
    }

    return record;
  }

  /**
   * Cập nhật thông tin phiếu đăng ký
   * @param {string} maDangKy
   * @param {import('../types/registrationTypes').UpdateRegistrationDTO} dto
   * @returns {import('../types/registrationTypes').RegistrationEntity}
   */
  static updateRegistration(maDangKy, dto) {
    this.getByMaDangKy(maDangKy); // Kiểm tra tồn tại
    RegistrationModel.update(maDangKy, dto);
    return this.getByMaDangKy(maDangKy);
  }

  static async syncStudentInfo(mssv, tenSinhVien) {
    return RegistrationModel.updateStudentInfo(mssv, tenSinhVien);
  }

  static async syncTopicInfo(maDeTai, tenDeTai) {
    return RegistrationModel.updateTopicInfo(maDeTai, tenDeTai);
  }

  /**
   * Xóa phiếu đăng ký
   * @param {string} maDangKy
   */
  static deleteRegistration(maDangKy) {
    this.getByMaDangKy(maDangKy); // Kiểm tra tồn tại
    RegistrationModel.delete(maDangKy);
  }
}

module.exports = RegistrationService;