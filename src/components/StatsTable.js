import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';

const StatsTable = ({ stats }) => {
  if (!stats) {
    return <Typography variant="body1">No stats available</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        URL Information
      </Typography>
      <Typography variant="body1">
        <strong>Original URL:</strong> {stats.originalUrl}
      </Typography>
      <Typography variant="body1">
        <strong>Short URL:</strong> <a href={stats.shortLink} target="_blank" rel="noopener noreferrer">{stats.shortLink}</a>
      </Typography>
      <Typography variant="body1">
        <strong>Created At:</strong> {new Date(stats.createdAt).toLocaleString()}
      </Typography>
      <Typography variant="body1">
        <strong>Expires At:</strong> {new Date(stats.expiresAt).toLocaleString()}
      </Typography>
      <Typography variant="body1">
        <strong>Total Clicks:</strong> {stats.totalClicks}
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Click Details
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Referrer</TableCell>
              <TableCell>Country</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.clicks.map((click, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(click.timestamp).toLocaleString()}</TableCell>
                <TableCell>{click.referrer}</TableCell>
                <TableCell>{click.country}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StatsTable;