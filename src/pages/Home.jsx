import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import CustomToolBar from '../components/CustomToolBar';
import ProductsPage from './Products/ProductsPage';
import ResponsiveDrawer from '../components/ResponsiveDrawer/ResponsiveDrawer';
import { MobileProvider } from '../components/MobileProvider';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ProvidersPage from './Providers/ProviderPage';
import UserPage from './Users/UserPage';


const drawerWidth = 240;

const ContentHeader = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


export default function Home() {

  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <MobileProvider>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} >

          <CustomToolBar handleDrawerOpen={handleDrawerOpen} open={open} />

        </AppBar>
        {/* nuevo componente */}
        <ResponsiveDrawer open={open} handleDrawerClose={handleDrawerClose} navigate={navigate} style={{ width: drawerWidth }} />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <ContentHeader />
          {/* aca va la page*/}

          <Routes>
            <Route path="/" element={<Navigate to="/home/products" />} />
            <Route path="products/*" element={<ProductsPage />} />
            <Route path='providers/*' element={<ProvidersPage />} />
            <Route path='users/*' element={<UserPage/>} />
          </Routes>

        </Box>
      </Box>
    </MobileProvider>
  );
}