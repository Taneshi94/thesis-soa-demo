const RegistrationModel = require('../models/registrationModel');
const IRegistrationService = require('../interfaces/IRegistrationService');
const { AppError } = require('../errorHandler');

/**
 * @typedef {import('../types/registrationTypes').RegistrationEntity} RegistrationEntity
 * @typedef {import('../types/registrationTypes').CreateRegistrationDTO} CreateRegistrationDTO
 * @typedef {import('better-sqlite3').RunResult} RunResult
 */

const GATEWAY_URL = process.env.GATEWAY_URL || 'http://localhost:3000';

class RegistrationService extends IRegistrationService {

  // 1. Lấy tất cả danh sách đăng ký
  /**
   * @returns {RegistrationEntity[]}
   */
  static getAllRegistrations() {
    return RegistrationModel.findAll();
  }

  // 2. Lấy thông tin 1 phiếu đăng ký theo maDangKy
  /**
   * @param {string} maDangKy
   * @returns {RegistrationEntity}
   */
  static getByMaDangKy(maDangKy) {
    const registration = RegistrationModel.findByMaDangKy(maDangKy);
    if (!registration) {
      throw new AppError(`Không tìm thấy phiếu đăng ký với mã: ${maDangKy}`, 404);
    }
    return registration;
  }

  // 3. Xác thực sinh viên từ Student Service
  /**
   * @private
   * @param {string} mssv
   */
  static async _verifyStudent(mssv) {
    let studentRes;
    try {
      studentRes = await fetch(`${GATEWAY_URL}/api/students/${mssv}`);
    } catch (error) {
      throw new AppError('Không thể kết nối tới Student Service', 500);
    }

    if (!studentRes.ok) {
      throw new AppError(`Sinh viên ${mssv} không tồn tại trong hệ thống`, 404);
    }

    const studentData = await studentRes.json();
    return studentData.data;
  }

  // 4. Xác thực đề tài từ Topic Service (Kiểm tra đề tài còn mở - trangThai === 0)
  /**
   * @private
   * @param {string} maDeTai
   */
  static async _verifyTopic(maDeTai) {
    let topicRes;
    try {
      topicRes = await fetch(`${GATEWAY_URL}/api/topics/${maDeTai}`);
    } catch (error) {
      throw new AppError('Không thể kết nối tới Topic Service', 500);
    }

    if (!topicRes.ok) {
      throw new AppError(`Đề tài ${maDeTai} không tồn tại trong hệ thống`, 404);
    }

    const topicData = await topicRes.json();

    // Kiểm tra trạng thái đề tài: 0 = Còn mở, 1 = Đã đăng ký, 2 = Đã đóng
    if (topicData.data?.trangThai !== 0 ) {
      throw new AppError('Đề tài hiện không thể đăng ký (Đã có người đăng ký hoặc đóng)', 400);
    }

    return topicData.data;
  }

  // 5. Thực hiện đăng ký đề tài (Kiểm tra Sinh viên, Đề tài -> Tạo bản ghi -> Cập nhật trangThai bên Topic Service)
  /**
   * @param {CreateRegistrationDTO} dto
   * @returns {Promise<RegistrationEntity>}
   */
  static async registerTopic(dto) {
    if (!dto || !dto.mssv || !dto.maDeTai) {
      throw new AppError('Thiếu thông tin mssv hoặc maDeTai', 400);
    }

    const student = await this._verifyStudent(dto.mssv);
    const topic = await this._verifyTopic(dto.maDeTai);

    const randomId = Math.floor(100000 + Math.random() * 900000);

    /** @type {RegistrationEntity} */
    const record = {
      maDangKy: `DK${randomId}`,
      mssv: dto.mssv,
      tenSinhVien: student.hoTen,
      maDeTai: dto.maDeTai,
      tenDeTai: topic.tenDeTai,
      ngayDangKy: new Date().toISOString()
    };

    RegistrationModel.create(record);

    // Cập nhật trạng thái đề tài sang 1 (Đã đăng ký) bên Topic Service
    await this._updateTopicState(dto.maDeTai, 1);

    return record;
  }

  // 6. Cập nhật thông tin phiếu đăng ký
  /**
   * @param {string} maDangKy
   * @param {Partial<RegistrationEntity>} data
   * @returns {Promise<RegistrationEntity>}
   */
  static async updateRegistration(maDangKy, data) {
    const existing = this.getByMaDangKy(maDangKy);

    // Chuẩn bị dữ liệu cập nhật (Xác thực & lấy tên mới nếu có thay đổi)
    const updatePayload = await this._prepareUpdateData(existing, data);

    // Xử lý side-effect đổi trạng thái đề tài ở Topic Service (nếu đổi maDeTai)
    if (data.maDeTai && data.maDeTai !== existing.maDeTai) {
      await this._handleTopicChange(existing.maDeTai, data.maDeTai);
    }

    // Update DB & trả về kết quả
    RegistrationModel.update(maDangKy, updatePayload);
    return this.getByMaDangKy(maDangKy);
  }

  // 7. Chuẩn bị dữ liệu cập nhật (Xác thực & lấy thông tin mới nếu có thay đổi)
  /**
   * @private
   * @param {RegistrationEntity} existing
   * @param {Partial<RegistrationEntity>} data
   */
  static async _prepareUpdateData(existing, data) {
    const payload = { ...existing, ...data };

    if (data.mssv && data.mssv !== existing.mssv) {
      const student = await this._verifyStudent(data.mssv);
      payload.tenSinhVien = student.hoTen;
    }

    if (data.maDeTai && data.maDeTai !== existing.maDeTai) {
      const topic = await this._verifyTopic(data.maDeTai); // Hàm này đã check trangThai === 0
      payload.tenDeTai = topic.tenDeTai;
    }

    return payload;
  }

  // 8. Xử lý side-effect khi đổi maDeTai: Cập nhật trạng thái đề tài cũ sang 0 và đề tài mới sang 1
  /**
   * @private
   * @param {string} oldMaDeTai
   * @param {string} newMaDeTai
   */
  static async _handleTopicChange(oldMaDeTai, newMaDeTai) {
    // Mở lại đề tài cũ (trangThai = 0) & Khóa đề tài mới (trangThai = 1)
    await Promise.all([
      this._updateTopicState(oldMaDeTai, 0),
      this._updateTopicState(newMaDeTai, 1)
    ]);
  }

  // 9. Cập nhật trạng thái đề tài ở Topic Service
  /**
   * @private
   * @param {string} maDeTai
   * @param {number} trangThai
   */
  static async _updateTopicState(maDeTai, trangThai) {
    try {
      await fetch(`${GATEWAY_URL}/api/topics/${maDeTai}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trangThai })
      });
    } catch (err) {
      console.error(`Lỗi cập nhật trạng thái đề tài ${maDeTai}:`, err);
    }
  }

  // 10. Đồng bộ thông tin tên sinh viên khi bên Student Service cập nhật
  /**
   * @param {string} mssv
   * @param {string} tenSinhVien
   * @returns {Promise<RunResult>}
   */
  static async syncStudentInfo(mssv, tenSinhVien) {
    return RegistrationModel.updateStudentInfo(mssv, tenSinhVien);
  }

  // 11. Đồng bộ thông tin tên đề tài khi bên Topic Service cập nhật
  /**
   * @param {string} maDeTai
   * @param {string} tenDeTai
   * @returns {Promise<RunResult>}
   */
  static async syncTopicInfo(maDeTai, tenDeTai) {
    return RegistrationModel.updateTopicInfo(maDeTai, tenDeTai);
  }

  // 12. Xóa phiếu đăng ký theo maDangKy
  /**
   * @param {string} maDangKy
   * @returns {void}
   */
  static deleteRegistration(maDangKy) {
    this.getByMaDangKy(maDangKy);
    RegistrationModel.delete(maDangKy);
  }

  // 13. Cascade Delete: Xóa tất cả phiếu đăng ký khi sinh viên bị xóa
  /**
   * @param {string} mssv
   * @returns {RunResult}
   */
  static deleteByMssv(mssv) {
    return RegistrationModel.deleteByMssv(mssv);
  }

  // 14. Cascade Delete: Xóa tất cả phiếu đăng ký khi đề tài bị xóa
  /**
   * @param {string} maDeTai
   * @returns {RunResult}
   */
  static deleteByMaDeTai(maDeTai) {
    return RegistrationModel.deleteByMaDeTai(maDeTai);
  }
}

module.exports = RegistrationService;