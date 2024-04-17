import React, { useState } from 'react';
import {
  Container, Grid, Typography, Button, TextField, FormControl, InputLabel, Select, MenuItem,
  InputAdornment, IconButton, Snackbar, Alert
} from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/Firebase/firebase';
import validateEmail from '../../util/EmailVerifier';
import { createUser } from '../../services/UserService';
import Person from '../../models/Person';
import User from '../../models/User';

export default function UserPage() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    birthDate: dayjs(),
    password: '',
    confirmPassword: '',
    active: 1,
    roleId: ''
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPasswords, setShowPasswords] = useState(false);

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

  const handlePhoneNumberChange = (event) => {
    let inputValue = event.target.value.replace(/\D/g, ''); // Elimina todos los caracteres que no sean números
    inputValue = inputValue.slice(0, 10); // Limita la longitud a 10 dígitos
    setUserData({ ...userData, phoneNumber: inputValue });
  };

  const handleSubmit = async () => {
    if (!validateEmail(userData.email)) {
      setSnackbarOpen(true);
      setSnackbarMessage('El correo electrónico no es válido.');
      setSnackbarSeverity('error');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      const userId = userCredential.user.uid;
      const user = new User({
        id: userId,
        person: new Person({
          name: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          address: userData.address,
          birthDate: userData.birthDate.toISOString(),
          active: userData.active
        }),
        roleId: userData.roleId
      });

      await createUser(user);

      setSnackbarOpen(true);
      setSnackbarMessage('¡Usuario creado correctamente!');
      setSnackbarSeverity('success');
      setUserData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        birthDate: dayjs(),
        active: 1,
        password: '',
        confirmPassword: '',
        roleId: ''
      });
    } catch (error) {
      setSnackbarOpen(true);
      setSnackbarMessage('Error al registrar usuario en Firebase.');
      setSnackbarSeverity('error');
    }
  };

  const areAllFieldsComplete = () => {
    return Object.values(userData).every(value => value !== '') && passwordsMatch;
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', height: '100%', paddingTop: '10vh' }}>
      <Typography variant="h4" align="center" gutterBottom>Registro de usuario</Typography>
      <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              required
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
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              required
              name="phoneNumber"
              label="Teléfono"
              value={userData.phoneNumber}
              onChange={handlePhoneNumberChange}
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
              required
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
              required
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
              required
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
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="label" required>Selecciona Rol</InputLabel>
            <Select  
              value={userData.roleId}
              onChange={handleInputChange}
              label="Seleccione una opción"
              name="roleId"
              fullWidth
            > 
              <MenuItem value="1">Administrador</MenuItem>
              <MenuItem value="2">Empleado</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
      </Grid>
        <Grid item xs={12} style={{ textAlign: 'end', marginTop: '16px' }}>
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!areAllFieldsComplete()}>
            Registrar
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
