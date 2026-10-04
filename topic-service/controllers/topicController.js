const TopicService = require('../services/topicService');
const { asyncHandler } = require('../errorHandler');

exports.getAllTopics = asyncHandler(async (req, res) => {
  const topics = await TopicService.getAllTopics();
  res.json({ success: true, data: topics });
});

exports.getTopicByMaDeTai = asyncHandler(async (req, res) => {
  const { maDeTai } = req.params;
  const topic = await TopicService.getTopicByMaDeTai(maDeTai);
  res.json({ success: true, data: topic });
});

exports.updateStatus = asyncHandler(async (req, res) => {
  const { maDeTai } = req.params;
  // req.body đóng vai trò là UpdateTopicStatusDTO { trangThai }
  const updatedTopic = await TopicService.updateTopicStatus(maDeTai, req.body);
  res.json({ success: true, message: 'Cập nhật trạng thái thành công', data: updatedTopic });
});