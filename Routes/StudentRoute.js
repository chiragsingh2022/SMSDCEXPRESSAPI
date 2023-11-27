const express = require('express');
const { GetStudent, PostStudent, PatchStudent, DeleteStudent, AddAttendance } = require('../Controllers/StudentsController');
const router = new express.Router();
const { validateToken } = require('../Controllers/Jwt')
const multer = require('multer');

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route("/").get(validateToken, GetStudent);
router.route("/").post(validateToken, upload.single('image'), PostStudent);
router.route("/:id/attendance").post(validateToken, AddAttendance);
router.route("/:id").patch(validateToken, PatchStudent);
router.route("/:id").delete(validateToken, DeleteStudent);


module.exports = router;