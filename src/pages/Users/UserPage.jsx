import { FormControl, Container, Grid, Typography, Button, TextField } from '@mui/material';
import CustomLabelForm from '../../components/UserComponents/CustomLabelForm';
import * as React from 'react';
import dayjs from 'dayjs';  
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';

export default function UserPage() {
  const [value, setValue] = React.useState(dayjs());
  const [cleared, setCleared] = React.useState(false);

  const handleDateChange = (newValue) => {
    setValue(newValue);
  };

  const handleSubmit = () => {
    // Aquí puedes implementar la lógica para manejar la creación de usuarios
  };

  React.useEffect(() => {
    let timeout;
    if (cleared) {
      timeout = setTimeout(() => {
        setCleared(false);
      }, 1000); 
    }
    return () => clearTimeout(timeout);
  }, [cleared]);

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
                slotProps={{
                  field: { clearable: true, onClear: () => setCleared(true) },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    type="text"
                    placeholder="Seleccione una fecha"
                    fullWidth
                  />
                )}
              />
            </LocalizationProvider>
            {cleared && (
              <Alert
                sx={{ position: 'absolute', bottom: 0, right: 0 }}
                severity="success"
              >
                ¡Campo borrado!
              </Alert>
            )}
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
