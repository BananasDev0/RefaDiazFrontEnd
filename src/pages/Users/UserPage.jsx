import { FormControl, Container, Grid, Typography, Button, TextField, IconButton, InputAdornment, Select, MenuItem, InputLabel } from '@mui/material';
import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/Firebase/firebase';
import validateEmail from '../../util/EmailVerifier';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { createUser } from '../../services/UserService'
import Person from '../../models/Person';
import User from '../../models/User';

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
    roleId: ''
  });

  const [alertOpen, setAlertOpen] = React.useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = React.useState(false);
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
        setErrorAlertOpen(true); // Mostrar la alerta de error
        setTimeout(() => {
          setErrorAlertOpen(false);
        }, 5000);
        console.error('El correo electrónico no es válido.');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);

      console.log('Usuario creado:', userCredential.user);

      const userId = userCredential.user.uid;

      const user = new User({
        id: userId,
        person: new Person({
          name: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          address: userData.address,
          birthDate: userData.birthDate,
          active: userData.active
        }),
        roleId: userData.roleId
      });

      await createUser(user);

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
        role_id: ''
      });

      setAlertOpen(true);
      setTimeout(() => {
        setAlertOpen(false);
      }, 5000);
    } catch (error) {
      setErrorAlertOpen(true);
      setTimeout(() => {
        setErrorAlertOpen(false);
      }, 5000);
      console.error('Error al registrar usuario en Firebase:', error);
    }
  };

  const areAllFieldsComplete = () => {
    const arePasswordsMatching = userData.password === userData.confirmPassword;
    return Object.values(userData).every(value => value !== '') && arePasswordsMatching;
  };

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', height: '100vh', marginTop: '10vh' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Registro de usuario
      </Typography>
      <Grid container spacing={2} >
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
              onChange={(e) => {
                // Verifica si el valor ingresado contiene solo números
                const inputPhoneNumber = e.target.value.replace(/\D/g, '');
                setUserData({ ...userData, phoneNumber: inputPhoneNumber });
            }}
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
          {errorAlertOpen && (
            <Alert
              sx={{ marginTop: '0.5rem' }}
              severity="error"
            >
              El correo electrónico ingresado no es válido.
            </Alert>
          )}
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
          <Grid item xs={12} style={{ textAlign: 'end', marginTop: '16px' }}>
            <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!areAllFieldsComplete()}>
              Registrar
            </Button>
            {alertOpen && (
              <Alert
                sx={{ position: 'absolute', bottom: 0, right: 0 }}
                severity="success"
              >
                ¡Usuario creado correctamente!
              </Alert>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
