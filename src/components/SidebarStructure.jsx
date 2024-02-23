import React from 'react';
import { Grid } from '@mui/material';

export function SidebarStructure() {



  return (
    <Grid 
    spacing={2}
    container 
    sx={{
        backgroundColor: '#4287f5', // Color de fondo para la barra de navegación
        color: '#000', // Color de texto para la barra de navegación
        padding: '20px'
      }}
    >
      <Grid item xs={12}>
        <div>sidebar</div>
      </Grid>
    </Grid>
  );
}
