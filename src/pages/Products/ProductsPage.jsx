import { Box, Tab, Tabs, Menu, MenuItem, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { useState } from "react";
import { useMobile } from "../../components/MobileProvider";
import ProductSelector from "./ProductSelector";
import ProductDialog from "./ProductDialog/ProductDialog";
import ProviderDialog from "../Providers/ProviderDialog";
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function ProductsPage() {
  const [value, setValue] = useState('one');
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [openProviderDialog, setOpenProviderDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSpeedDial, setOpenSpeedDial] = useState(false);


  const responsive = useMobile();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenProviderDialog = () => {
    setOpenProviderDialog(true);
  };

  const handleOpenProductDialog = () => {
    setOpenProductDialog(true);
  };

  const handleCloseProductDialog = () => {
    setOpenProductDialog(false);
  };

  const handleCloseProviderDialog = () => {
    setOpenProviderDialog(false);
  };

  const handleSpeedDialOpen = () => {
    setOpenSpeedDial(true);
  };

  const handleSpeedDialClose = () => {
    setOpenSpeedDial(false);
  };

  const actions = [
    { icon: <InventoryIcon />, name: 'Agregar Radiador', handler: handleOpenProductDialog },
    { icon: <PersonAddIcon />, name: 'Agregar Proveedor', handler: handleOpenProviderDialog },
    // Puedes agregar más acciones según sea necesario
  ];

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
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
          onClose={handleSpeedDialClose}
          onOpen={handleSpeedDialOpen}
          open={openSpeedDial}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => {
                action.handler();
                handleSpeedDialClose(); // Cerrar el SpeedDial después de hacer clic en una acción
              }}
            />
          ))}
        </SpeedDial>
        <ProductDialog open={openProductDialog} onClose={handleCloseProductDialog} />
        <ProviderDialog open={openProviderDialog} onClose={handleCloseProviderDialog} />
      </Box>
  );
}
