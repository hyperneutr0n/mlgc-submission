const express = require('express');
const predict = require('./handler');

const router = express.Router();

router.post('/', predict);

module.exports = router;