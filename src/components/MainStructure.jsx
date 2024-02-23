import '../styles/MainStructure.css'
import { SidebarStructure } from './SidebarStructure';
import { BodyStructure } from "./BodyStructure"
import { Grid,Box } from '@mui/material';

export function MainStructure() {





    return (
        <Grid container className="main-container"  spacing={2}>
          <Grid>
            <SidebarStructure />
          </Grid>
          <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <BodyStructure />
          </Box>
        </Grid>
      );
}