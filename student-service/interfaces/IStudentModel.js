class IStudentModel {
  findAll() {
    throw new Error("Phương thức 'findAll()' chưa được triển khai!");
  }

  findByMssv(mssv) {
    throw new Error("Phương thức 'findByMssv()' chưa được triển khai!");
  }

  create(data) {
    throw new Error("Phương thức 'create()' chưa được triển khai!");
  }
}

module.exports = IStudentModel;