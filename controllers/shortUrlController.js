const ShortUrl = require('../models/ShortUrl');
const shortid = require('shortid');
const { logger } = require('../middleware/loggingMiddleware');
const geoip = require('geoip-lite');

exports.createShortUrl = async (req, res) => {
  try {
    const { url, validity = 30, shortcode } = req.body;
    
    // Validate URL
    if (!url) {
      logger.error('URL is required');
      return res.status(400).json({ error: 'URL is required' });
    }

    let code = shortcode || shortid.generate();
    const expiresAt = new Date(Date.now() + validity * 60000);

    // Check if custom shortcode already exists
    if (shortcode) {
      const existing = await ShortUrl.findOne({ shortCode: shortcode });
      if (existing) {
        logger.error(`Shortcode ${shortcode} already exists`);
        return res.status(409).json({ error: 'Shortcode already in use' });
      }
    }

    const shortUrl = new ShortUrl({
      originalUrl: url,
      shortCode: code,
      expiresAt
    });

    await shortUrl.save();
    
    logger.info(`Short URL created: ${code} for ${url}`);
    
    res.status(201).json({
      shortLink: `${req.protocol}://${req.get('host')}/${code}`,
      expiry: expiresAt.toISOString()
    });
  } catch (error) {
    logger.error(`Error creating short URL: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.redirectUrl = async (req, res) => {
  try {
    const { shortcode } = req.params;
    const shortUrl = await ShortUrl.findOne({ shortCode: shortcode });
    
    if (!shortUrl) {
      logger.error(`Shortcode ${shortcode} not found`);
      return res.status(404).json({ error: 'Short URL not found' });
    }
    
    if (new Date() > shortUrl.expiresAt) {
      logger.error(`Shortcode ${shortcode} has expired`);
      return res.status(410).json({ error: 'Short URL has expired' });
    }

    // Log click data
    const geo = geoip.lookup(req.ip);
    shortUrl.clicks.push({
      referrer: req.get('Referer') || 'Direct',
      ip: req.ip,
      country: geo ? geo.country : 'Unknown'
    });
    
    await shortUrl.save();
    
    logger.info(`Redirecting ${shortcode} to ${shortUrl.originalUrl}`);
    
    res.redirect(shortUrl.originalUrl);
  } catch (error) {
    logger.error(`Error redirecting: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getStats = async (req, res) => {
  try {
    const { shortcode } = req.params;
    const shortUrl = await ShortUrl.findOne({ shortCode: shortcode });
    
    if (!shortUrl) {
      logger.error(`Stats requested for non-existent shortcode ${shortcode}`);
      return res.status(404).json({ error: 'Short URL not found' });
    }
    
    const stats = {
      originalUrl: shortUrl.originalUrl,
      shortLink: `${req.protocol}://${req.get('host')}/${shortUrl.shortCode}`,
      createdAt: shortUrl.createdAt,
      expiresAt: shortUrl.expiresAt,
      totalClicks: shortUrl.clicks.length,
      clicks: shortUrl.clicks.map(click => ({
        timestamp: click.timestamp,
        referrer: click.referrer,
        country: click.country
      }))
    };
    
    logger.info(`Stats retrieved for ${shortcode}`);
    
    res.status(200).json(stats);
  } catch (error) {
    logger.error(`Error getting stats: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};