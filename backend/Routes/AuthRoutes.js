const express = require('express');
const router = express.Router();
const { Register } = require("../Controller/authController")

router.post('/signup', Register);

module.exports = router;