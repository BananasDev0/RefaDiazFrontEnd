// src/components/AppLayout.jsx
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import CustomToolBar from './CustomToolBar';
import ResponsiveDrawer from './ResponsiveDrawer/ResponsiveDrawer';
import { MobileProvider } from './MobileProvider';
import { AppBarStyled, ContentHeaderStyled } from '../styles/layoutStyles';

const MainContent = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const AppLayout = ({ children, navigate }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  return (
    <MobileProvider>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBarStyled position="fixed" open={drawerOpen}>
          <CustomToolBar handleDrawerOpen={handleDrawerOpen} open={drawerOpen} />
        </AppBarStyled>
        <ResponsiveDrawer open={drawerOpen} handleDrawerClose={handleDrawerClose} navigate={navigate} />
        <MainContent>
          <ContentHeaderStyled />
          {children}
        </MainContent>
      </Box>
    </MobileProvider>
  );
};

export default AppLayout;