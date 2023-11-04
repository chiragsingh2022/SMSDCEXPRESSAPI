const express = require('express');
const PostLogin = require('../Controllers/LoginUser');

const router = new express.Router();

router.route('/').post(PostLogin);

module.exports = router;