const mongoose = require('mongoose');

const shortUrlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  shortCode: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true
  },
  clicks: [{
    timestamp: {
      type: Date,
      default: Date.now
    },
    referrer: String,
    ip: String,
    country: String
  }]
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);