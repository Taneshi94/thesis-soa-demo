class ITopicService {
  getAllTopics() {
    throw new Error("Phương thức 'getAllTopics()' chưa được triển khai!");
  }

  getTopicByMaDeTai(maDeTai) {
    throw new Error("Phương thức 'getTopicByMaDeTai()' chưa được triển khai!");
  }

  updateTopicStatus(maDeTai, dto) {
    throw new Error("Phương thức 'updateTopicStatus()' chưa được triển khai!");
  }
}

module.exports = ITopicService;