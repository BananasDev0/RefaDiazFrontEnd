import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  Snackbar,
  Alert,
  type AlertColor,
  type SnackbarCloseReason,
} from '@mui/material';
import type { ReactNode } from 'react';

interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
  autoHideDuration?: number;
}

interface SnackbarContextType {
  showSnackbar: (
    message: string, 
    severity: AlertColor, 
    autoHideDuration?: number
  ) => void;
  closeSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'info',
    autoHideDuration: 6000,
  });

  const showSnackbar = useCallback((
    message: string, 
    severity: AlertColor = 'info', 
    autoHideDuration: number = 6000
  ) => {
    setSnackbarState({
      open: true,
      message,
      severity,
      autoHideDuration,
    });
  }, []);

  const closeSnackbar = useCallback(() => {
    setSnackbarState(prev => ({
      ...prev,
      open: false,
    }));
  }, []);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    closeSnackbar();
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar, closeSnackbar }}>
      {children}
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={snackbarState.autoHideDuration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarState.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
}; 