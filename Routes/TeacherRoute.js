const express = require('express');
const { GetTeacher, DeleteTeacher, PatchTeacher, PostTeacher, } = require('../Controllers/TeachersController');
const router = new express.Router();
const { validateToken } = require('../Controllers/Jwt')

router.route("/").get(validateToken, GetTeacher);
router.route("/").post(validateToken, PostTeacher);
router.route("/:id").patch(validateToken, PatchTeacher);
router.route("/:id").delete(validateToken, DeleteTeacher);

module.exports = router;