import { FormStructure } from "./FormStructure";
import { SidebarStructure } from "./SidebarStructure";
import { Grid } from '@mui/material';
export function BodyStructure() {




    return (
        <Grid container spacing={2}>
      <Grid item xs={2}>
        <SidebarStructure />
      </Grid>
      <Grid item xs={10}>
        <FormStructure />
      </Grid>
    </Grid>
    );
}