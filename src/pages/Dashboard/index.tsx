import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Header } from '../../components/layout/Header';

export const Dashboard: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Header handleDrawerOpen={handleDrawerOpen} />
      {/* Aquí se renderizará el menú lateral (Drawer) y el contenido principal */}
    </Box>
  );
};