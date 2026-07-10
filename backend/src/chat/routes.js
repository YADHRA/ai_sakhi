const express = require('express');
const { handleChat } = require('./controller');

const router = express.Router();
router.post('/chat', handleChat);

module.exports = router;