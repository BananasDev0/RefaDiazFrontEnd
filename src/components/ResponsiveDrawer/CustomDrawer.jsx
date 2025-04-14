import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { openedMixin, closedMixin } from '../../styles/utils/drawerFunctions';
import DrawerContent from './DrawerContent';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const CustomDrawer = ({ open, handleDrawerClose, setComponent }) => {
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerContent 
        handleDrawerClose={handleDrawerClose} 
        setComponent={setComponent} 
        open={open} 
      />
    </Drawer>
  );
};

export default CustomDrawer;
