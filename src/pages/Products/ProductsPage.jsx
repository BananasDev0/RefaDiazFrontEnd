import { Box, Fab, Tab, Tabs, Menu, MenuItem, Zoom } from "@mui/material";
import { useState } from "react";
import { useMobile } from "../../components/MobileProvider";
import ProductSelector from "./ProductSelector";
import AddIcon from '@mui/icons-material/Add';
import ProductDialog from "./ProductDialog/ProductDialog";
import ProviderDialog from "../Providers/ProviderDialog";

export default function ProductsPage() {
  const [value, setValue] = useState('one');
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [openProviderDialog, setOpenProviderDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const responsive = useMobile();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenProviderDialog = () => {
    setOpenProviderDialog(true);
  }

  const handleOpenProductDialog = () => {
    setOpenProductDialog(true);
  };

  const handleCloseProductDialog = () => {
    setOpenProductDialog(false);
  };

  const handleCloseProviderDialog = () => {
    setOpenProviderDialog(false);
  }

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box sx={{ width: '100%', '& > *:not(style)': { mb: 3 } }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        sx={{ width: responsive.isMobile ? '85vw' : '100%' }}
      >
        <Tab value="one" label="Radiadores" />
        <Tab value="two" label="Tapas" />
        <Tab value="three" label="Abanicos" />
      </Tabs>
      <Box sx={{
        height: 'calc(100vh - 250px)',
        overflowY: 'auto'
      }}>
        <ProductSelector />
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleOpenProductDialog}>
          Agregar Radiador
        </MenuItem>
        <MenuItem onClick={handleOpenProviderDialog}>
          Agregar Proveedor
        </MenuItem>
        {/* Agrega más elementos MenuItem según sea necesario */}
      </Menu>
      <Zoom in={true} timeout={500}>
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          onClick={handleOpenMenu}
        >
          <AddIcon />
        </Fab>
      </Zoom>
      <ProductDialog open={openProductDialog} onClose={handleCloseProductDialog} />
      <ProviderDialog open={openProviderDialog} onClose={handleCloseProviderDialog} />
    </Box>
  );
}
