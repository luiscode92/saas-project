const express = require('express');

const { signup, login, test } = require('../controllers/auth.js');

const router = express.Router();

router.post('/test', test)
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;