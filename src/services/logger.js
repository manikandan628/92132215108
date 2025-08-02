const logToServer = async (level, message) => {
  try {
    const response = await fetch('http://localhost:5000/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        level,
        message
      }),
    });
    
    if (!response.ok) {
      console.error('Failed to log to server');
    }
  } catch (error) {
    console.error('Error logging to server:', error);
  }
};

export const logger = {
  info: (message) => logToServer('info', message),
  error: (message) => logToServer('error', message),
  warn: (message) => logToServer('warn', message)
};