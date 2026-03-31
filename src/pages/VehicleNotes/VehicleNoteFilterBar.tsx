import { useMemo } from 'react';
import {
  Autocomplete,
  Button,
  Grid,
  Paper,
  TextField,
} from '@mui/material';
import { useBrands, useModels } from '../../hooks/useVehicleData';
import type { VehicleNoteFilters } from '../../types/vehicleNote.types';

interface VehicleNoteFilterBarProps {
  filters: VehicleNoteFilters;
  onChange: (filters: VehicleNoteFilters) => void;
}

const VehicleNoteFilterBar = ({
  filters,
  onChange,
}: VehicleNoteFilterBarProps) => {
  const { data: brands = [], isLoading: isLoadingBrands } = useBrands();
  const { data: models = [], isLoading: isLoadingModels } = useModels(filters.brandId);

  const selectedBrand = useMemo(
    () => brands.find((brand) => brand.id === filters.brandId) ?? null,
    [brands, filters.brandId]
  );
  const selectedModel = useMemo(
    () => models.find((model) => model.id === filters.carModelId) ?? null,
    [filters.carModelId, models]
  );

  const clearFilters = () => {
    onChange({
      textSearch: null,
      brandId: null,
      carModelId: null,
    });
  };

  return (
    <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Buscar"
            placeholder="Titulo, marca o modelo"
            value={filters.textSearch ?? ''}
            onChange={(event) => onChange({
              ...filters,
              textSearch: event.target.value || null,
            })}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Autocomplete
            options={brands}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={selectedBrand}
            onChange={(_, value) => onChange({
              ...filters,
              brandId: value?.id ?? null,
              carModelId: null,
            })}
            loading={isLoadingBrands}
            renderInput={(params) => <TextField {...params} label="Marca" />}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Autocomplete
            options={models}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={selectedModel}
            onChange={(_, value) => onChange({
              ...filters,
              carModelId: value?.id ?? null,
            })}
            loading={isLoadingModels}
            disabled={!filters.brandId}
            renderInput={(params) => <TextField {...params} label="Modelo" />}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <Button fullWidth variant="outlined" onClick={clearFilters} sx={{ height: '100%' }}>
            Limpiar filtros
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default VehicleNoteFilterBar;
