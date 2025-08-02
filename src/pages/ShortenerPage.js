import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import UrlForm from '../components/UrlForm';
import UrlList from '../components/UrlList';
import { logger } from '../services/logger';

const ShortenerPage = () => {
  const [urls, setUrls] = useState([]);

  const handleUrlCreated = (newUrl) => {
    setUrls([...urls, newUrl]);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          URL Shortener
        </Typography>
        <Typography variant="body1" paragraph>
          Enter a long URL to create a shortened version
        </Typography>
        
        <UrlForm onUrlCreated={handleUrlCreated} />
        <UrlList urls={urls} />
      </Box>
    </Container>
  );
};

export default ShortenerPage;