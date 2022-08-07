const youtubeController = require('../../controllers/v1/youtubeController');
const express = require('express');
let router = express.Router();

router.use('/youtube', youtubeController);

module.exports = router;
