const express = require('express');
const { GetStudent, PostStudent, PatchStudent, DeleteStudent, AddAttendance } = require('../Controllers/StudentsController');
const router = new express.Router();
const { validateToken } = require('../Controllers/Jwt')

router.route("/").get(validateToken, GetStudent);
router.route("/").post(validateToken, PostStudent);
router.route("/:id/attendance").post(validateToken, AddAttendance);
router.route("/:id").patch(validateToken, PatchStudent);
router.route("/:id").delete(validateToken, DeleteStudent);
//router.post('/students/:id/attendance', AddAttendance);

module.exports = router;