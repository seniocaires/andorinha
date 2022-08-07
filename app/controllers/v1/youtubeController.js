const express = require('express');
const service = require('../../services/v1/youtubeService');
let router = express.Router();

router.get('/info', service.info);
router.get('/download', service.download);

module.exports = router;
