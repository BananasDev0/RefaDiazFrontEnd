import { FormControl, Container, Grid, Typography, Button } from '@mui/material';
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

  const handleSubmit = () => {
    // Aquí puedes implementar la lógica para manejar la creación de usuarios
  };

  return (
    <Container style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Registro de usuario
      </Typography>
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
          <FormControl fullWidth style={{ marginTop: '1rem', width: '85%' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de nacimiento"
                value={value}
                onChange={handleDateChange}
                inputFormat="DD/MM/YYYY"
                renderInput={(params) => (
                  <input
                    {...params.inputProps}
                    type="text"
                    placeholder="Seleccione una fecha"
                    readOnly
                    style={{ width: '100%' }}
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
        <Grid item xs={12} style={{ textAlign: 'end' }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Registrar
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
