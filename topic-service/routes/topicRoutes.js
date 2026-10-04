const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');

router.get('/', topicController.getAllTopics);
router.get('/:maDeTai', topicController.getTopicByMaDeTai);
router.patch('/:maDeTai/status', topicController.updateStatus);

module.exports = router;