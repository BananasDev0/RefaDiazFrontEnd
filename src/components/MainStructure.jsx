import '../styles/MainStructure.css'
import { NavbarStructure } from "./NavbarStructure"
import { BodyStructure } from "./BodyStructure"
import { Grid } from '@mui/material';

export function MainStructure() {




    return (
        <Grid container className="main-container"  spacing={2}>
          <Grid item xs={12}>
            <NavbarStructure />
          </Grid>
          <Grid item xs={12}>
            <BodyStructure />
          </Grid>
        </Grid>
      );
}