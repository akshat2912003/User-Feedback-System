const express = require('express');
const router = express.Router();
const { createFeedback, getFeedback } = require('../controllers/feedback');

router.post('/feedback', createFeedback);
router.get('/feedback', getFeedback);

module.exports = router;