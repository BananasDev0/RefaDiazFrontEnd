import { Typography, Box } from '@mui/material';
import ExpandableCard from '../../../components/ExpandableCard';

const ProviderManager = () => {
  // Aquí iría el estado y la lógica para manejar proveedores si fuera necesario
  // Por ahora, el componente está preparado pero no implementa funcionalidad específica

  return (
    <ExpandableCard title="Proveedores">
      <Typography gutterBottom variant="body2" component="p" sx={{ mb: 2 }}>
        Añade y gestiona tus proveedores.
      </Typography>
      <Box sx={{ mb: 2 }}>
      </Box>
      {/* Aquí iría la lógica para listar y gestionar proveedores */}
    </ExpandableCard>
  );
};

export default ProviderManager;
