const express = require('express');
const { GetUser, PostUser, PatchUser, DeleteUser } = require('../Controllers/UsersController');
const router = new express.Router();
const {validateToken} = require('../Controllers/Jwt')

router.route("/").get(validateToken,GetUser);
router.route("/").post(validateToken,PostUser);
router.route("/:id").patch(validateToken,PatchUser);
router.route("/:id").delete(validateToken,DeleteUser);

module.exports = router;