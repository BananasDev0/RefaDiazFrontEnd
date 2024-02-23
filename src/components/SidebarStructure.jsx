import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Button } from '@mui/material';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';


export function SidebarStructure() {
  const [open, setOpen] = useState(true);
  
  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 60 : 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? 60 : 240
        }
      }}
    >
        <Button onClick={toggleOpen}>{open ? <DensityMediumIcon sx={{ color: 'black' }}/> : <ArrowBackIosIcon sx={{ color: 'black' }}/>}</Button>
      <List>
        <ListItem button>
          <ListItemText primary="Item 1" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Item 2" />
        </ListItem>
        {/* Agrega más elementos de la lista según sea necesario */}
      </List>
      
    </Drawer>
  );
}
