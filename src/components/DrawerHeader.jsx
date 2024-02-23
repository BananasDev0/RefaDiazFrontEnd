import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Header = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const DrawerHeader = ({ handleDrawerClose }) => { // Recibe handleDrawerClose como prop
  const theme = useTheme(); // Utiliza el hook useTheme

  return (
    <Header>
      {/* Contenido del header del drawer */}
      <IconButton onClick={handleDrawerClose}> {/* Agrega el IconButton con onClick */}
        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
    </Header>
  );
};

export default DrawerHeader;
