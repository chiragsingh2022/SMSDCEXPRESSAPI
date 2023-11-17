const express = require('express');
const {postAttendance} = require('../Controllers/AttendanceController');
const router = new express.Router();
const {validateToken} = require('../Controllers/Jwt');

router.route('/:id').post(validateToken,postAttendance);

module.exports = router;