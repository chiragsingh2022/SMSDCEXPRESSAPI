const express = require('express');
const { PatchAttachment,  PostAttachment, DeleteAttachment } = require('../Controllers/FileAttachmentsController');
const router = new express.Router();
const { validateToken } = require('../Controllers/Jwt')
const multer = require('multer');
const upload = multer();

router.route("/").post(validateToken, upload.single('image'), PostAttachment);
router.route("/:id").patch(validateToken, PatchAttachment);
router.route("/:id").delete(validateToken, DeleteAttachment);


module.exports = router;