const RegistrationService = require('../services/registrationService');

class RegistrationController {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static getAll(req, res) {
    try {
      const registrations = RegistrationService.getAllRegistrations();
      return res.status(200).json({ success: true, data: registrations });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Lỗi hệ thống khi lấy danh sách đăng ký';
      return res.status(500).json({ success: false, message });
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static getByMaDangKy(req, res) {
    try {
      const maDangKy = String(req.params.maDangKy); // Khắc phục ts(2345)
      const registration = RegistrationService.getByMaDangKy(maDangKy);
      return res.status(200).json({ success: true, data: registration });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Không tìm thấy phiếu đăng ký';
      return res.status(404).json({ success: false, message });
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static create(req, res) {
    try {
      const newRegistration = RegistrationService.registerTopic(req.body);
      return res.status(201).json({ success: true, data: newRegistration });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Lỗi khi tạo đăng ký';
      return res.status(400).json({ success: false, message });
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static update(req, res) {
    try {
      const maDangKy = String(req.params.maDangKy); // Khắc phục ts(2345)
      const updated = RegistrationService.updateRegistration(maDangKy, req.body);
      return res.status(200).json({ success: true, data: updated });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Lỗi khi cập nhật đăng ký';
      return res.status(400).json({ success: false, message });
    }
  }

  static async syncStudent(req, res) {
    try {
      const mssv = String(req.params.mssv);
      const { tenSinhVien } = req.body;
      RegistrationService.syncStudentInfo(mssv, tenSinhVien);
      return res.status(200).json({ success: true, message: 'Đã đồng bộ thông tin sinh viên' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Lỗi khi đồng bộ thông tin sinh viên';
      return res.status(500).json({ success: false, message: message });
    }
  }

  static async syncTopic(req, res) {
    try {
      const maDeTai = String(req.params.maDeTai);
      const { tenDeTai } = req.body;
      RegistrationService.syncTopicInfo(maDeTai, tenDeTai);
      return res.status(200).json({ success: true, message: 'Đã đồng bộ thông tin đề tài' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Lỗi khi đồng bộ thông tin đề tài';
      return res.status(500).json({ success: false, message: message });
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static delete(req, res) {
    try {
      const maDangKy = String(req.params.maDangKy); // Khắc phục ts(2345)
      RegistrationService.deleteRegistration(maDangKy);
      return res.status(200).json({ success: true, message: `Đã xóa đăng ký ${maDangKy}` });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Lỗi khi xóa đăng ký';
      return res.status(400).json({ success: false, message });
    }
  }
}

module.exports = RegistrationController;