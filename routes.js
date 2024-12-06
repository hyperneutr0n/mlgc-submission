const express = require('express');
const { predict, histories } = require('./handler');

const router = express.Router();

router.post('/', predict);
router.get('/histories', histories);

module.exports = router;