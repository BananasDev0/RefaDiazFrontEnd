import { FormControl, Container, Grid } from '@mui/material';
import CustomLabelForm from '../../components/UserComponents/CustomLabelForm';
import * as React from 'react';
import dayjs from 'dayjs';  
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function UserPage() {
  const [value, setValue] = React.useState(dayjs());

  const handleDateChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <CustomLabelForm labelText="Nombres" />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <CustomLabelForm labelText="Apellidos" />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth style={{ marginTop: '1rem' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Selecciona la fecha de nacimiento"
                value={value}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <input
                    {...params.inputProps}
                    type="text"
                    placeholder="Seleccione una fecha"
                    readOnly 
                  />
                )}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <CustomLabelForm labelText="Email" />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <CustomLabelForm labelText="Teléfono" />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <CustomLabelForm labelText="Dirección" />
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  );
}
