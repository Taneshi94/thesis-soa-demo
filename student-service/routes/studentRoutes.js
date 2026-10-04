const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/', studentController.getAllStudents);
router.get('/:mssv', studentController.getStudentByMssv);
router.post('/', studentController.createStudent);

module.exports = router;