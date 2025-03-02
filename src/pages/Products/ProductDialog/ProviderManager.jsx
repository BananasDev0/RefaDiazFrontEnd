import { useState, useEffect } from 'react';
import {
  Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, IconButton, Typography, Grid,
  Modal, Box, Card, CardContent
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandableCard from '../../../components/ExpandableCard';
import CustomSelectWithAdd from '../../../components/CustomSelectWithAdd';
import { getAll, createProvider } from '../../../services/ProviderService';
import { useSnackbar } from '../../../components/SnackbarContext';
import { modifyAndClone } from '../../../util/generalUtils';
import Provider from '../../../models/Provider';
import { useProductDialogForm } from './ProductDialogFormContext';

const ProviderDetailModal = ({ open, onClose, provider }) => (
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
          <Button variant="contained" onClick={onClose} style={{ marginTop: 2 }}>Cerrar</Button>
        </CardContent>
      </Card>
    </Box>
  </Modal>
);

const ProviderManagerDisplay = ({
  product,
  providers,
  setProviders,
  selectedProvider,
  price,
  numSeries,
  handleProviderChange,
  handlePriceChange,
  handleNumSeriesChange,
  handleAddProvider,
  handleDeleteProvider,
  handleOnProviderAdded,
  handleProviderClick,
  editable
}) => (
  <ExpandableCard title="Proveedores">
    <Typography gutterBottom variant="body2" component="p" sx={{ mb: 2 }}>
      {editable ? 'Añade y gestiona los proveedores del producto.' : ''}
    </Typography>
    {editable && (
      <>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}>
            <CustomSelectWithAdd
              elements={providers}
              label="Proveedor"
              selectedItem={selectedProvider}
              setSelectedItem={handleProviderChange}
              setElements={setProviders}
              onItemAdded={handleOnProviderAdded}
              dialogFields={[
                { name: 'name', label: 'Nombre del Proveedor', type: 'text', required: true },
                { name: 'phoneNumber', label: 'Número de Teléfono', type: 'tel' },
                { name: 'address', label: 'Dirección', type: 'text' },
                { name: 'comments', label: 'Comentarios', type: 'text' },
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Precio de Compra"
              type="number"
              value={price}
              onChange={handlePriceChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Número de Series"
              value={numSeries}
              onChange={handleNumSeriesChange}
              fullWidth
            />
          </Grid>
        </Grid>
        <Button onClick={handleAddProvider} variant="contained" sx={{ mt: 2 }} disabled={!selectedProvider || !price || !numSeries}>
          Agregar Proveedor
        </Button>
      </>
    )}
    <Table size="small" sx={{ mt: 4 }}>
      <TableHead>
        <TableRow>
          <TableCell>Proveedor</TableCell>
          <TableCell align="right">Precio de Compra</TableCell>
          <TableCell align="right">Número de Series</TableCell>
          {editable && <TableCell align="right">Acciones</TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {product.providers && product.providers.map((providerProduct, index) => (
          <TableRow 
            key={index} 
            onClick={() => handleProviderClick(providerProduct.provider)}
            sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
          >
            <TableCell>{providerProduct.provider.name}</TableCell>
            <TableCell align="right">{providerProduct.price.cost}</TableCell>
            <TableCell align="right">{providerProduct.numSeries}</TableCell>
            {editable && (
              <TableCell align="right">
                <IconButton 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProvider(index);
                  }} 
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </ExpandableCard>
);

const ProviderManager = ({ editable = true }) => {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [price, setPrice] = useState('');
  const [numSeries, setNumSeries] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedModalProvider, setSelectedModalProvider] = useState(null);
  const { openSnackbar } = useSnackbar();
  const { product, setProduct } = useProductDialogForm();

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await getAll();
        if (response && response.providers) {
          setProviders(response.providers);
        }
      } catch (error) {
        openSnackbar(`Error al obtener los proveedores: ${error.message}`, 'error');
      }
    };
    fetchProviders();
  }, []);

  const handleProviderChange = (provider) => {
    setSelectedProvider(provider);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleNumSeriesChange = (event) => {
    setNumSeries(event.target.value);
  };

  const handleAddProvider = () => {
    if (selectedProvider && price && numSeries) {
      const newProviderProduct = {
        providerId: selectedProvider.id,
        provider: selectedProvider,
        price: {
          cost: parseFloat(price),
          description: `Precio de compra de ${selectedProvider.name}`
        },
        numSeries: numSeries
      };
      setProduct(modifyAndClone(product, 'providers', [...(product.providers || []), newProviderProduct]));
      setSelectedProvider(null);
      setPrice('');
      setNumSeries('');
    }
  };

  const handleDeleteProvider = (index) => {
    const newProviders = product.providers.filter((_, i) => i !== index);
    setProduct(modifyAndClone(product, 'providers', newProviders));
  };

  const handleOnProviderAdded = async (providers, newProviderData) => {
    try {
      const newProvider = await createProvider(new Provider(newProviderData));
      setProviders([...providers, newProvider]);
      return newProvider.id;
    } catch (error) {
      openSnackbar(`Error al crear el proveedor: ${error.message}`, 'error');
    }
  };

  const handleProviderClick = (provider) => {
    setSelectedModalProvider(provider);
    setModalOpen(true);
  };

  return (
    <>
      <ProviderManagerDisplay
        product={product}
        providers={providers}
        selectedProvider={selectedProvider}
        price={price}
        numSeries={numSeries}
        setProviders={setProviders}
        handleProviderChange={handleProviderChange}
        handlePriceChange={handlePriceChange}
        handleNumSeriesChange={handleNumSeriesChange}
        handleAddProvider={handleAddProvider}
        handleDeleteProvider={handleDeleteProvider}
        handleOnProviderAdded={handleOnProviderAdded}
        handleProviderClick={handleProviderClick}
        editable={editable}
      />
      <ProviderDetailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        provider={selectedModalProvider}
      />
    </>
  );
};

export { ProviderManager as default, ProviderManagerDisplay };