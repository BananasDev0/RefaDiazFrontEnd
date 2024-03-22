import { FormControl, Container, Grid, Typography, Button, TextField, IconButton, InputAdornment } from '@mui/material';
import * as React from 'react';
import dayjs from 'dayjs';  
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/Firebase/firebase';
import axios from 'axios';
import validateEmail from '../../util/EmailVerifier';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function UserPage() {
  const [userData, setUserData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    birthDate: dayjs(),
    password: '',
    confirmPassword: '',
    active: 1,
  });

  const areAllFieldsComplete = () => {
    const arePasswordsMatching = userData.password === userData.confirmPassword;
    return Object.values(userData).every(value => value !== '') && arePasswordsMatching;
  };

  const [cleared, setCleared] = React.useState(false);
  const [passwordsMatch, setPasswordsMatch] = React.useState(true);
  const [showPasswords, setShowPasswords] = React.useState(false);

  const handleDateChange = (newValue) => {
    setUserData({ ...userData, birthDate: newValue });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleConfirmPasswordBlur = () => {
    const arePasswordsMatching = userData.confirmPassword === userData.password;
    setPasswordsMatch(arePasswordsMatching);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPasswords(!showPasswords);
  };

  const handleSubmit = async () => {
    try {
      if (!validateEmail(userData.email)) {
        console.error('El correo electrónico no es válido.');
        return;
      }

      const { email, password } = userData;

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      console.log('Usuario creado:', userCredential.user);
      const userId = userCredential.user.uid;

      const createUser = {
        id: userId,
        person: {
          name: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          address: userData.address,
          birthDate: userData.birthDate,
          active: userData.active
        }
      };

      await axios.post('http://localhost:3000/api/user/', createUser);

      setUserData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        birthDate: dayjs(),
        active: 1,
        password:'',
        confirmPassword: ''
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
    <Container style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', height: '100vh'}}>
      <Typography variant="h4" align="center" gutterBottom>
        Registro de usuario
      </Typography>
      <Grid container spacing={2} >
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
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth style={{ width: '100%' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de nacimiento"
                value={userData.birthDate}
                onChange={handleDateChange}
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
        <Grid item xs={12} sm={6}>
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
              type={showPasswords ? 'text' : 'password'} // Mostrar texto si showPasswords es verdadero
              value={userData.password}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      {showPasswords ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              name="confirmPassword"
              label="Confirmar Contraseña"
              type={showPasswords ? 'text' : 'password'} 
              value={userData.confirmPassword}
              onChange={handleInputChange}
              onBlur={handleConfirmPasswordBlur}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      {showPasswords ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {!passwordsMatch && (
              <Alert
                sx={{ marginTop: '0.5rem' }}
                severity="error"
              >
                Las contraseñas no coinciden.
              </Alert>
            )}
          </FormControl>
          <Grid item xs={12} style={{ textAlign: 'end' }}>
            <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!areAllFieldsComplete()}>
              Registrar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )}
