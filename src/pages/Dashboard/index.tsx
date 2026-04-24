import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, styled } from '@mui/material';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { useMobile } from '../../contexts/MobileProvider';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export const Dashboard: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const { isMobile } = useMobile();

  const handleDrawerToggle = () => {
    setOpen((currentOpen) => !currentOpen);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header open={open} handleDrawerToggle={handleDrawerToggle} isMobile={isMobile} />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} isMobile={isMobile} />
      <Box component="main" sx={{ flexGrow: 1, width: '100%', p: { xs: 1.5, sm: 2, md: 3 } }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};
