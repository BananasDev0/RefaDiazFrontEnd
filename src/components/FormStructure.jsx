import { Grid } from "@mui/material";

export function FormStructure() {




    return (
    <Grid
    spacing={2}
    container 
    sx={{
        backgroundColor: '#ffff00', // Color de fondo para la barra de navegación
        color: '#000', // Color de texto para la barra de navegación
        padding: '20px'
      }}    
    >
        <Grid item xs={12}>
        <div>form</div>
      </Grid>

    </Grid>
    )
}