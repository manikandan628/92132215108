import React, { useState } from 'react';
import { TextField, Button, Box, Grid } from '@mui/material';
import { logger } from '../services/logger';
import { createShortUrl } from '../services/api'; // Add this import

const UrlForm = ({ onUrlCreated }) => {
  const [url, setUrl] = useState('');
  const [validity, setValidity] = useState(30);
  const [shortcode, setShortcode] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateUrl(url)) {
      setError('Please enter a valid URL');
      logger.error('Invalid URL submitted');
      return;
    }
    
    setError('');
    
    try {
      const urlData = { url, validity };
      if (shortcode) urlData.shortcode = shortcode;
      
      const result = await createShortUrl(urlData);
      onUrlCreated(result);
      
      // Reset form
      setUrl('');
      setValidity(30);
      setShortcode('');
      
      logger.info('URL successfully shortened');
    } catch (error) {
      logger.error(`Form submission error: ${error.message}`);
      setError(error.response?.data?.error || 'Failed to create short URL');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Long URL"
            variant="outlined"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            error={!!error}
            helperText={error}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Validity (minutes)"
            type="number"
            variant="outlined"
            value={validity}
            onChange={(e) => setValidity(parseInt(e.target.value) || 30)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Custom Shortcode (optional)"
            variant="outlined"
            value={shortcode}
            onChange={(e) => setShortcode(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Shorten URL
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UrlForm;