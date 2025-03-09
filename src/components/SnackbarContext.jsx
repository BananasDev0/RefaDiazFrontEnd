// src/contexts/SnackbarContext.js
import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

// Componente separado para el Snackbar
const SnackbarComponent = () => {
  const { snackbarOpen, snackbarMessage, snackbarSeverity, closeSnackbar } = useSnackbar();

  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={closeSnackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={closeSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};

export const SnackbarProvider = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const openSnackbar = useCallback((message, severity = 'info') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Memoizamos el valor del contexto para evitar rerenderizados innecesarios
  const contextValue = useMemo(() => ({
    openSnackbar,
    closeSnackbar,
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity
  }), [snackbarOpen, snackbarMessage, snackbarSeverity]);

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <SnackbarComponent />
    </SnackbarContext.Provider>
  );
};
