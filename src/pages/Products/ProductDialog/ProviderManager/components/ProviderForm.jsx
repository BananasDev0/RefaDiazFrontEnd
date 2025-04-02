import { Grid, TextField } from '@mui/material';
import CustomSelectWithAdd from '../../../../../components/CustomSelectWithAdd';

export const ProviderForm = ({
  providers,
  selectedProvider,
  price,
  numSeries,
  onProviderChange,
  onPriceChange,
  onNumSeriesChange,
  onProviderCreation,
  setProviders
}) => {
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={12} sm={4}>
        <CustomSelectWithAdd
          elements={providers}
          label="Proveedor"
          selectedItem={selectedProvider}
          setSelectedItem={onProviderChange}
          setElements={setProviders}
          onItemAdded={onProviderCreation}
          dialogFields={[
            { name: 'name', label: 'Nombre del Proveedor', type: 'text', required: true },
            { name: 'phoneNumber', label: 'Número de Teléfono', type: 'tel', required: true },
            { name: 'address', label: 'Dirección', type: 'text', required: true },
            { name: 'comments', label: 'Comentarios', type: 'text' },
          ]}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Precio de Compra"
          type="number"
          value={price}
          onChange={(e) => onPriceChange(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Número de Series"
          value={numSeries}
          onChange={(e) => onNumSeriesChange(e.target.value)}
          fullWidth
        />
      </Grid>
    </Grid>
  );
}; 