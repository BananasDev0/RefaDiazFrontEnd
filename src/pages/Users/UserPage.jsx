import { FormControl, Container, Grid, Typography, Button, TextField } from '@mui/material';
import * as React from 'react';
import dayjs from 'dayjs';  
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';
import axios from 'axios'; // Importar Axios

export default function UserPage() {
  const [userData, setUserData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    birthDate: dayjs(),
    active: 1,
  });

  const [cleared, setCleared] = React.useState(false);

  const handleDateChange = (newValue) => {
    setUserData({ ...userData, birthDate: newValue });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      // Formatear la fecha en el formato "YYYY-MM-DD"
      const formattedDate = userData.birthDate.format('YYYY-MM-DD');

      const combinedData = {
        user: {
          name: userData.firstName,
          last_name: userData.lastName,
          email: userData.email,
          phone_number: userData.phoneNumber,
          address: userData.address,
          active: userData.active,
        },
        person: {
          name: userData.firstName,
          last_name: userData.lastName,
          birth_date: formattedDate,
        },
      };
  
      await axios.post('http://localhost:3000/api/user/', combinedData);
      console.log('Usuario y persona registrados exitosamente.');
  
      setUserData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        birthDate: dayjs(),
        active: 1,
      });

      setCleared(false);
    } catch (error) {
      console.error('Error al registrar usuario y persona:', error);
    }
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
            <TextField
              name="firstName"
              label="Nombres"
              value={userData.firstName}
              onChange={handleInputChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              name="lastName"
              label="Apellidos"
              value={userData.lastName}
              onChange={handleInputChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth style={{ marginTop: '1rem', width: '85%' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de nacimiento"
                value={userData.birthDate}
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
            <TextField
              name="email"
              label="Email"
              value={userData.email}
              onChange={handleInputChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              name="phoneNumber"
              label="Teléfono"
              value={userData.phoneNumber}
              onChange={handleInputChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              name="address"
              label="Dirección"
              value={userData.address}
              onChange={handleInputChange}
            />
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
