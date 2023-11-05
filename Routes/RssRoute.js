const express = require('express');
const { GetRss } = require('../Controllers/RssController');
const router = new express.Router();
const {validateToken} = require('../Controllers/Jwt')

router.route("/").get(GetRss);
// router.route("/").post(validateToken,PostUser);
// router.route("/:id").patch(validateToken,PatchUser);
// router.route("/:id").delete(validateToken,DeleteUser);

module.exports = router;