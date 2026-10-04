class ITopicModel {
  findAll() {
    throw new Error("Phương thức 'findAll()' chưa được triển khai!");
  }

  findByMaDeTai(maDeTai) {
    throw new Error("Phương thức 'findByMaDeTai()' chưa được triển khai!");
  }

  updateStatus(maDeTai, trangThai) {
    throw new Error("Phương thức 'updateStatus()' chưa được triển khai!");
  }
}

module.exports = ITopicModel;