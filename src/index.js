import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { logger } from './services/logger';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Log initial render
logger.info('React application rendered');