import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PageHeader from '../../components/common/PageHeader';

const adminMenuItems = [
  {
    title: 'Usuarios',
    description: 'Administra los usuarios del sistema.',
    icon: <ManageAccountsIcon fontSize="large" color="primary" />,
    path: '/admin/users',
  },
  {
    title: 'Marcas',
    description: 'Administra el catálogo de marcas.',
    icon: <DirectionsCarIcon fontSize="large" color="primary" />,
    path: '/admin/brands',
  },
];

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <PageHeader title="Administracion" />
      <Grid container spacing={3}>
        {adminMenuItems.map((item) => (
          <Grid key={item.path} size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                {item.icon}
                <Typography variant="h6">{item.title}</Typography>
              </Box>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                {item.description}
              </Typography>
              <Button variant="contained" onClick={() => navigate(item.path)}>
                Abrir
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminPage;
