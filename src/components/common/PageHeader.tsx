import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

interface PageHeaderProps {
  title: string;
  actionButton?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, actionButton }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          // On extra-small (xs) screens, stack them vertically
          flexDirection: { xs: 'column', sm: 'row' },
          // Add a gap for spacing when stacked
          gap: { xs: 2, sm: 0 },
          // Align items to the start when stacked
          alignItems: { xs: 'flex-start', sm: 'center' },
        }}
      >
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        {actionButton && <Box>{actionButton}</Box>}
      </Box>
      <Divider />
    </Box>
  );
};

export default PageHeader;
