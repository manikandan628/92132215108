import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const UrlList = ({ urls }) => {
  if (!urls.length) {
    return <Typography variant="body1">No URLs shortened yet</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Original URL</TableCell>
            <TableCell>Short URL</TableCell>
            <TableCell>Expires At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {urls.map((url, index) => (
            <TableRow key={index}>
              <TableCell>{url.originalUrl}</TableCell>
              <TableCell>
                <a href={url.shortLink} target="_blank" rel="noopener noreferrer">
                  {url.shortLink}
                </a>
              </TableCell>
              <TableCell>{new Date(url.expiry).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UrlList;