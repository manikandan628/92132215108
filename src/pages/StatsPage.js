import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import StatsTable from '../components/StatsTable';
import { getShortUrlStats } from '../services/api';
import { logger } from '../services/logger';

const StatsPage = () => {
  const [shortcode, setShortcode] = useState('');
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shortcode) {
      setError('Please enter a shortcode');
      return;
    }
    
    try {
      const data = await getShortUrlStats(shortcode);
      setStats(data);
      setError('');
      logger.info(`Stats displayed for ${shortcode}`);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to fetch stats');
      logger.error(`Error fetching stats: ${error.message}`);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          URL Statistics
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
          <TextField
            label="Enter Shortcode"
            variant="outlined"
            value={shortcode}
            onChange={(e) => setShortcode(e.target.value)}
            error={!!error}
            helperText={error}
          />
          <Button type="submit" variant="contained" sx={{ ml: 2 }}>
            Get Stats
          </Button>
        </Box>
        
        {stats && <StatsTable stats={stats} />}
      </Box>
    </Container>
  );
};

export default StatsPage;