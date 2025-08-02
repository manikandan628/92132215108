import axios from 'axios';
import { logger } from './logger';

const API_BASE_URL = 'http://localhost:5000';

export const createShortUrl = async (urlData) => {
  try {
    logger.info(`Creating short URL for ${urlData.url}`);
    const response = await axios.post(`${API_BASE_URL}/shorturls`, urlData);
    return response.data;
  } catch (error) {
    logger.error(`Error creating short URL: ${error.message}`);
    throw error;
  }
};

export const getShortUrlStats = async (shortcode) => {
  try {
    logger.info(`Fetching stats for ${shortcode}`);
    const response = await axios.get(`${API_BASE_URL}/shorturls/${shortcode}`);
    return response.data;
  } catch (error) {
    logger.error(`Error fetching stats: ${error.message}`);
    throw error;
  }
};