const express = require('express');
const {MarkAllAttendance,GetStudentsBySubjectAndSemester} = require('../Controllers/AttendanceController');
const router = new express.Router();
const {validateToken} = require('../Controllers/Jwt');

router.route('/:subjectId/:semester').get(validateToken,GetStudentsBySubjectAndSemester);
router.route('/').post(validateToken,MarkAllAttendance);

module.exports = router;