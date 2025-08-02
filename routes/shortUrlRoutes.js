const express = require('express');
const router = express.Router();
const { loggingMiddleware } = require('../middleware/loggingMiddleware');
const {
  createShortUrl,
  redirectUrl,
  getStats
} = require('../controllers/shortUrlController');

router.use(loggingMiddleware);

router.post('/shorturls', createShortUrl);
router.get('/:shortcode', redirectUrl);
router.get('/shorturls/:shortcode', getStats);

module.exports = router;