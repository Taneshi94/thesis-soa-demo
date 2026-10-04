const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');

router.get('/', registrationController.getAllRegistrations);
router.post('/', registrationController.registerTopic);

module.exports = router;