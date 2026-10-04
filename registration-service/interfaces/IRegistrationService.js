class IRegistrationService {
  getAllRegistrations() {
    throw new Error("Phương thức 'getAllRegistrations()' chưa được triển khai!");
  }

  registerTopic(dto) {
    throw new Error("Phương thức 'registerTopic()' chưa được triển khai!");
  }

  getByMaDangKy(maDangKy) {
    throw new Error("Phương thức 'getByMaDangKy()' chưa được triển khai!");
  }

  createRegistration(dto) {
    throw new Error("Phương thức 'createRegistration()' chưa được triển khai!");
  }

  updateRegistration(maDangKy, dto) {
    throw new Error("Phương thức 'updateRegistration()' chưa được triển khai!");
  }

  syncStudentInfo(mssv, tenSinhVien) {
    throw new Error("Phương thức 'syncStudentInfo()' chưa được triển khai!");
  }

  syncTopicInfo(maDeTai, tenDeTai) {
    throw new Error("Phương thức 'syncTopicInfo()' chưa được triển khai!");
  }
  
  deleteRegistration(maDangKy) {
    throw new Error("Phương thức 'deleteRegistration()' chưa được triển khai!");
  }
}

module.exports = IRegistrationService;