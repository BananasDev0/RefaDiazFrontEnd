import { FormStructure } from "./FormStructure";
import { NavbarStructure } from "./NavbarStructure";
import { Grid } from '@mui/material';
export function BodyStructure() {




    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <NavbarStructure />
        </Grid>
        <Grid item xs={12}>
          <FormStructure />
        </Grid>
    </Grid>
    );
}