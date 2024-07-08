const express = require('express');
const {  GetSession, GetSubject, GetCourse,
    PostSession, PostSubject, PostCourse,
    PatchSession, PatchSubject, PatchCourse,
    DeleteSession, DeleteSubject, DeleteCourse } = require('../Controllers/MastersController');
const router = new express.Router();
const {validateToken} = require('../Controllers/Jwt')

router.route("/subject").post(validateToken,PostSubject);
router.route("/subject").get(validateToken,GetSubject);
router.route("/subject/:id").patch(validateToken,PatchSubject);
router.route("/subject/:id").delete(validateToken,DeleteSubject);
router.route("/course").get(validateToken,GetCourse);
router.route("/course/:id").patch(validateToken,PatchCourse);
router.route("/session").get(validateToken,GetSession);
router.route("/session").post(PostSession);
router.route("/course").post(validateToken,PostCourse);
router.route("/session/:id").patch(validateToken,PatchSession);
router.route("/session/:id").delete(validateToken,DeleteSession);
router.route("/course/:id").delete(validateToken,DeleteCourse);

module.exports = router;