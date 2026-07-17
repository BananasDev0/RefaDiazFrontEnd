import { useEffect, useMemo } from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { BrandModelSelector } from '../../../components/common/BrandModelSelector';
import { useBrands, useModels } from '../../../hooks/useVehicleData';
import type { Brand } from '../../../types/brand.types';
import type { CarModel } from '../../../types/model.types';
import type { VehicleNoteFormData } from '../../../types/vehicleNote.types';

interface VehicleNoteVehicleSelectorProps {
  isReadOnly?: boolean;
}

const VehicleNoteVehicleSelector = ({
  isReadOnly = false,
}: VehicleNoteVehicleSelectorProps) => {
  const { watch, setValue } = useFormContext<VehicleNoteFormData>();
  const brandId = watch('brandId');
  const carModelId = watch('carModelId');

  const { data: brands = [] } = useBrands();
  const { data: models = [] } = useModels(brandId);

  const selectedBrand = useMemo(
    () => brands.find((brand) => brand.id === brandId) ?? null,
    [brandId, brands]
  );
  const selectedModel = useMemo(
    () => models.find((model) => model.id === carModelId) ?? null,
    [carModelId, models]
  );

  useEffect(() => {
    if (!brandId) {
      return;
    }

    if (carModelId && !models.some((model) => model.id === carModelId)) {
      setValue('carModelId', null, { shouldDirty: true });
    }
  }, [brandId, carModelId, models, setValue]);

  const handleBrandChange = (brand: Brand | null) => {
    setValue('brandId', brand?.id ?? null, { shouldDirty: true });
  };

  const handleModelChange = (model: CarModel | null) => {
    setValue('carModelId', model?.id ?? null, { shouldDirty: true });
  };

  const clearVehicle = () => {
    setValue('brandId', null, { shouldDirty: true });
    setValue('carModelId', null, { shouldDirty: true });
  };

  return (
    <Paper elevation={2} sx={{ p: 2, bgcolor: '#fff' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <Typography variant="h6">Vehiculo asociado</Typography>
          <Typography variant="body2" color="text.secondary">
            La nota puede quedar general o ligada a un modelo especifico.
          </Typography>
        </Box>
        {!isReadOnly && (
          <Button onClick={clearVehicle} disabled={!brandId && !carModelId}>
            Limpiar
          </Button>
        )}
      </Box>

      <Grid container spacing={2}>
        <BrandModelSelector
          selectedBrand={selectedBrand}
          selectedModel={selectedModel}
          onBrandChange={handleBrandChange}
          onModelChange={handleModelChange}
          disabled={isReadOnly}
          manageModels
          brandGridSize={{ xs: 12, md: 6 }}
          modelGridSize={{ xs: 12, md: 6 }}
        />
      </Grid>
    </Paper>
  );
};

export default VehicleNoteVehicleSelector;
