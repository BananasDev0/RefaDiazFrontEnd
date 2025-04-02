import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from '@mui/material';
import CustomSelectWithAdd from '../../../../../components/CustomSelectWithAdd';

const getBrandTypeLabel = (brandTypeId) => {
  switch (brandTypeId) {
    case 1:
      return 'Automotriz';
    case 2:
      return 'Carga Pesada';
    default:
      return '';
  }
};

export const ModelForm = ({
  brand,
  brands,
  models,
  setModels,
  productModel,
  onBrandChange,
  onModelChange,
  onStartYearChange,
  onLastYearChange,
  onModelAdded
}) => {
  const sortedBrands = [...brands].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel id="brand-select-label">Marca</InputLabel>
          <Select
            labelId="brand-select-label"
            id="brand-select"
            value={brand.id}
            onChange={onBrandChange}
            label="Marca"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {sortedBrands.map((brand) => (
              <MenuItem key={brand.id} value={brand.id}>
                {brand.name} ({getBrandTypeLabel(brand.brandTypeId)})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <CustomSelectWithAdd
          elements={models}
          setElements={setModels}
          label="Modelo"
          placeholder="Introduce un Modelo"
          selectedItem={models.find(model => model.id === productModel.carModelId)}
          setSelectedItem={onModelChange}
          getItemText={item => item.name}
          onItemAdded={onModelAdded}
          dialogFields={[
            {
              name: 'name',
              label: 'Nombre del Modelo',
              type: 'text',
              required: true,
            },
          ]}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Año Inicial"
          type="number"
          variant="outlined"
          value={productModel.initialYear || ''}
          onChange={(e) => onStartYearChange(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Año Final"
          type="number"
          variant="outlined"
          value={productModel.lastYear || ''}
          onChange={(e) => onLastYearChange(e.target.value)}
          fullWidth
        />
      </Grid>
    </Grid>
  );
}; 