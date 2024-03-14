import { FormControl, Container, Grid, Typography, Button, TextField } from '@mui/material';
import * as React from 'react';
import dayjs from 'dayjs';  
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import app from '../../services/Firebase/firebase';
import axios from 'axios';

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
      
      const { email, password } = userData;

      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      console.log('Usuario creado:', userCredential.user);
      
      const userId = userCredential.user.uid; //id firebase
      const person = userCredential.user.person; //person
      
      const newUser = {
        id: userId,
        person: {
          id: person.id,
          name: person.name,
          last_name: person.last_name,
          birth_date: person.birth_date,
          email: person.email,
          phone_number: person.phone_number,
          address: person.address,
          active: person.active,
          updated_at: person.updated_at,
          created_at: person.created_at
        },
        active: userCredential.user.active,
        updated_at: userCredential.user.updated_at,
        created_at: userCredential.user.created_at,
        person_id: person.id
      };


      const response = await axios.post('http://localhost:3000/api/user/', newUser);

      console.log('Usuario enviado al servidor con éxito');

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
      console.error('Error al registrar usuario en Firebase:', error);
    }
}


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
              name="password"
              label="Contraseña"
              type="password"
              value={userData.password}
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
