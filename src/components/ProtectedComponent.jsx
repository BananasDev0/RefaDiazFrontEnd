import { useEffect, useState } from 'react';
import { CircularProgress, Box } from '@mui/material';

export const ProtectedComponent = ({
  children,
  allowedRoles,
  fallbackComponent: FallbackComponent
}) => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Asumimos que el usuario ya está autenticado y su rol está almacenado en localStorage
    const userFromStorage = localStorage.getItem('user');
    const userDetails = userFromStorage ? JSON.parse(userFromStorage) : null;
    setUserRole(userDetails?.role?.description);
  }, []);

  // Si no se han cargado los roles todavía, mostramos algo para indicar que la carga está en progreso
  if (userRole === '') {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Verifica si el usuario tiene un rol permitido
  const hasPermission = allowedRoles.includes(userRole);

  if (!hasPermission) {
    // Si el usuario no tiene un rol permitido y se proporcionó un fallbackComponent, renderiza ese componente
    if (FallbackComponent) {
      return <FallbackComponent />;
    }
    // De lo contrario, renderiza un div vacío
    return <div />;
  }

  // Si el usuario tiene un rol permitido, renderiza los hijos
  return children;
};
