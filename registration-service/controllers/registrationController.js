const RegistrationService = require('../services/registrationService');
const { AppError } = require('../errorHandler');

class RegistrationController {
  // 1. Lấy danh sách tất cả phiếu đăng ký
  static getAll(req, res, next) {
    try {
      const registrations = RegistrationService.getAllRegistrations();
      return res.status(200).json({ success: true, data: registrations });
    } catch (error) {
      next(error);
    }
  }

  // 2. Lấy thông tin chi tiết phiếu đăng ký theo mã
  static getByMaDangKy(req, res, next) {
    try {
      const maDangKy = String(req.params.maDangKy);
      const registration = RegistrationService.getByMaDangKy(maDangKy);
      return res.status(200).json({ success: true, data: registration });
    } catch (error) {
      next(error);
    }
  }

  // 3. Tạo phiếu đăng ký mới
  static async create(req, res, next) {
    try {
      const newRegistration = await RegistrationService.registerTopic(req.body);
      return res.status(201).json({ success: true, data: newRegistration });
    } catch (error) {
      next(error);
    }
  }

  // 4. Cập nhật phiếu đăng ký
  static async update(req, res, next) {
    try {
      const maDangKy = String(req.params.maDangKy);
      const updated = await RegistrationService.updateRegistration(maDangKy, req.body);
      return res.status(200).json({ success: true, data: updated });
    } catch (error) {
      next(error);
    }
  }

  // 5. Đồng bộ thông tin sinh viên từ Student Service
  static async syncStudent(req, res, next) {
    try {
      const mssv = String(req.params.mssv);
      const { tenSinhVien } = req.body;

      if (!tenSinhVien) {
        throw new AppError('Tên sinh viên không được để trống khi đồng bộ', 400);
      }

      await RegistrationService.syncStudentInfo(mssv, tenSinhVien);
      return res.status(200).json({ success: true, message: 'Đã đồng bộ thông tin sinh viên' });
    } catch (error) {
      next(error);
    }
  }

  // 6. Đồng bộ thông tin đề tài từ Topic Service
  static async syncTopic(req, res, next) {
    try {
      const maDeTai = String(req.params.maDeTai);
      const { tenDeTai } = req.body;

      if (!tenDeTai) {
        throw new AppError('Tên đề tài không được để trống khi đồng bộ', 400);
      }

      await RegistrationService.syncTopicInfo(maDeTai, tenDeTai);
      return res.status(200).json({ success: true, message: 'Đã đồng bộ thông tin đề tài' });
    } catch (error) {
      next(error);
    }
  }

  // 7. Xóa phiếu đăng ký
  static async delete(req, res, next) {
    try {
      const maDangKy = String(req.params.maDangKy);
      await RegistrationService.deleteRegistration(maDangKy);
      return res.status(200).json({ success: true, message: `Đã xóa đăng ký ${maDangKy}` });
    } catch (error) {
      next(error);
    }
  }

  // 8. Xóa tất cả phiếu đăng ký của một sinh viên
  static async syncDeleteByStudent(req, res, next) {
    try {
      const mssv = String(req.params.mssv);
      await RegistrationService.deleteByMssv(mssv);
      return res.status(200).json({
        success: true,
        message: `Đã xóa các phiếu đăng ký của sinh viên ${mssv}`
      });
    } catch (error) {
      next(error);
    }
  }

  // 9. Xóa tất cả phiếu đăng ký liên quan đến một đề tài
  static async syncDeleteByTopic(req, res, next) {
    try {
      const maDeTai = String(req.params.maDeTai);
      await RegistrationService.deleteByMaDeTai(maDeTai);
      return res.status(200).json({
        success: true,
        message: `Đã xóa các phiếu đăng ký liên quan đến đề tài ${maDeTai}`
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RegistrationController;