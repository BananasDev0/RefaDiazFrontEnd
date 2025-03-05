import {
  Modal,
  Box,
  Card,
  CardContent,
  Typography,
  Button
} from '@mui/material';

export const ProviderDetailModal = ({ open, onClose, provider }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        p: 4,
      }}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
              Detalles del Proveedor
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Nombre:</strong> {provider?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Teléfono:</strong> {provider?.phoneNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Dirección:</strong> {provider?.address}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Comentarios:</strong> {provider?.comments}
            </Typography>
            <Button variant="contained" onClick={onClose} style={{ marginTop: 2 }}>
              Cerrar
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
}; 