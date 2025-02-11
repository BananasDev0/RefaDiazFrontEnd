// src/hooks/useAuth.js
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/AuthService';
import { useSnackbar } from '../components/SnackbarContext'; // Importa el contexto del Snackbar
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const { openSnackbar } = useSnackbar(); // Obtiene la función openSnackbar
  const navigate = useNavigate();

  const login = useCallback(async (email, password) => {
    setLoading(true);
    if (!email || !password) {
        openSnackbar('Favor de introducir los campos requeridos', 'error');
        setLoading(false);
        return false;
    }
    if (!emailRegex.test(email)) {
        openSnackbar('Introduce un Email valido', 'error');
        setLoading(false);
        return false;
    }
    try {
      const user = await authService.signIn(email, password); // Llama a la función del servicio
      if (user) {
        navigate('/home'); // Redirige al usuario
        return true;
      }
       // openSnackbar se llama desde el componente.
    } catch (error) {
        openSnackbar(error.message, 'error'); // Muestra el error con el Snackbar
        return false;
    } finally {
      setLoading(false);
    }
  }, [navigate, openSnackbar]);

  // Podrías agregar otras funciones relacionadas con la autenticación aquí,
  // como logout, register, etc.

  return { loading, login };
};

export default useAuth;