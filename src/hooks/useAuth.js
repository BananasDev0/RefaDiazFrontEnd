import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../components/SnackbarContext';
import * as authService from '../services/AuthService';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const login = useCallback(async (email, password) => {
    setLoading(true);
    if (!email || !password) {
      openSnackbar('Favor de introducir los campos requeridos', 'error');
      setLoading(false);
      return false;
    }
    if (!emailRegex.test(email)) {
      openSnackbar('Introduce un Email válido', 'error');
      setLoading(false);
      return false;
    }
    try {
      const user = await authService.signIn(email, password);
      if (user) {
        navigate('/home');
        return true;
      }
    } catch (error) {
      openSnackbar(error.message, 'error');
      return false;
    } finally {
      setLoading(false);
    }
  }, [navigate, openSnackbar]);

  return { loading, login };
};

export default useAuth;