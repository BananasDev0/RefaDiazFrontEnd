import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface SnackbarContextType {
  showSnackbar: (message: string, severity: 'success' | 'error' | 'warning' | 'info') => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Implementación básica del Snackbar o placeholder
  // En una implementación real, aquí manejarías el estado y la lógica del Snackbar
  const [snackbar, setSnackbar] = useState<{ message: string; severity: string; open: boolean } | null>(null);

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
    console.log(`Snackbar: ${message}, Severity: ${severity}`);
    // Lógica para mostrar el snackbar
    // Por ejemplo, podrías usar un estado para controlar la visibilidad y el mensaje del snackbar
    setSnackbar({ message, severity, open: true }); 
    // Aquí podrías tener un setTimeout para ocultarlo después de un tiempo
  };

  // Para cerrar el snackbar (ejemplo)
  // const closeSnackbar = () => setSnackbar(null);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {/* Aquí renderizarías tu componente Snackbar si es visible */}
      {snackbar && snackbar.open && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px 20px',
          background: snackbar.severity === 'error' ? 'red' : snackbar.severity === 'success' ? 'green' : 'blue',
          color: 'white',
          borderRadius: '5px',
          zIndex: 1000,
        }}>
          {snackbar.message}
          <button onClick={() => setSnackbar(null)} style={{ marginLeft: '10px', color: 'white', background: 'transparent', border: '1px solid white'}}>X</button>
        </div>
      )}
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