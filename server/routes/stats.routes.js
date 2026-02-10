const express = require('express');
const router = express.Router();
const statsController = require('../controllers/stats.controller');

// GET /api/stats/github/:username
router.get('/github/:username', statsController.getGitHubStats);

// GET /api/stats/leetcode/:username
router.get('/leetcode/:username', statsController.getLeetCodeStats);

module.exports = router;
