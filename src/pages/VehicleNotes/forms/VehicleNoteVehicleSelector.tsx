import { useEffect, useMemo, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useFormContext } from 'react-hook-form';
import { useBrands, useModels } from '../../../hooks/useVehicleData';
import type { Brand } from '../../../types/brand.types';
import type { CarModel } from '../../../types/model.types';
import type { VehicleNoteFormData } from '../../../types/vehicleNote.types';
import { AddModelDialog } from '../../Products/forms/dialogs/AddModelDialog';
import { DeleteModelDialog } from '../../Products/forms/dialogs/DeleteModelDialog';

interface VehicleNoteVehicleSelectorProps {
  isReadOnly?: boolean;
}

const ADD_NEW_MODEL_ID = -1;

const VehicleNoteVehicleSelector = ({
  isReadOnly = false,
}: VehicleNoteVehicleSelectorProps) => {
  const { watch, setValue } = useFormContext<VehicleNoteFormData>();
  const brandId = watch('brandId');
  const carModelId = watch('carModelId');
  const [isAddModelDialogOpen, setAddModelDialogOpen] = useState(false);
  const [modelToDelete, setModelToDelete] = useState<CarModel | null>(null);

  const { data: brands = [], isLoading: isLoadingBrands } = useBrands();
  const { data: models = [], isLoading: isLoadingModels } = useModels(brandId);

  const selectedBrand = useMemo(
    () => brands.find((brand) => brand.id === brandId) ?? null,
    [brandId, brands]
  );
  const selectedModel = useMemo(
    () => models.find((model) => model.id === carModelId) ?? null,
    [carModelId, models]
  );

  const sortedBrands = useMemo(
    () => [...brands].sort((a, b) => a.brandTypeId - b.brandTypeId),
    [brands]
  );
  const modelsWithOptions = useMemo(() => {
    if (!brandId) {
      return [];
    }

    const addNewOption: CarModel = {
      id: ADD_NEW_MODEL_ID,
      name: '+ Añadir nuevo modelo',
      brandId,
    };

    return [...models, addNewOption];
  }, [brandId, models]);

  useEffect(() => {
    if (!brandId) {
      return;
    }

    if (carModelId && !models.some((model) => model.id === carModelId)) {
      setValue('carModelId', null, { shouldDirty: true });
    }
  }, [brandId, carModelId, models, setValue]);

  const handleBrandChange = (_: React.SyntheticEvent, value: Brand | null) => {
    setValue('brandId', value?.id ?? null, { shouldDirty: true });
    setValue('carModelId', null, { shouldDirty: true });
  };

  const handleModelChange = (_: React.SyntheticEvent, value: CarModel | null) => {
    if (value?.id === ADD_NEW_MODEL_ID) {
      setAddModelDialogOpen(true);
      return;
    }

    setValue('carModelId', value?.id ?? null, { shouldDirty: true });
  };

  const handleNewModelSuccess = (newModel: CarModel) => {
    setValue('carModelId', newModel.id, { shouldDirty: true });
  };

  const handleDeleteModelClick = (event: React.MouseEvent, model: CarModel) => {
    event.stopPropagation();
    setModelToDelete(model);
  };

  const handleDeleteSuccess = () => {
    if (carModelId === modelToDelete?.id) {
      setValue('carModelId', null, { shouldDirty: true });
    }
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
        <Grid size={{ xs: 12, md: 6 }}>
          <Autocomplete
            options={sortedBrands}
            groupBy={(option) => (option.brandTypeId === 1 ? 'Automotriz' : 'Carga Pesada')}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={selectedBrand}
            onChange={handleBrandChange}
            loading={isLoadingBrands}
            disabled={isReadOnly}
            renderGroup={(params) => (
              <li key={params.key}>
                <Box
                  sx={{
                    position: 'sticky',
                    top: '-8px',
                    padding: '8px 16px',
                    fontWeight: 'bold',
                    backgroundColor: params.group === 'Automotriz' ? 'primary.light' : 'secondary.light',
                    color: params.group === 'Automotriz' ? 'primary.contrastText' : 'secondary.contrastText',
                  }}
                >
                  {params.group}
                </Box>
                <ul style={{ padding: 0 }}>{params.children}</ul>
              </li>
            )}
            renderInput={(params) => <TextField {...params} label="Marca" />}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Autocomplete
            options={modelsWithOptions}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={selectedModel}
            onChange={handleModelChange}
            loading={isLoadingModels}
            disabled={!brandId || isReadOnly}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.id === ADD_NEW_MODEL_ID ? (
                  <Box sx={{ fontStyle: 'italic', color: 'primary.main' }}>{option.name}</Box>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <span>{option.name}</span>
                    {!isReadOnly && (
                      <IconButton
                        size="small"
                        onClick={(event) => handleDeleteModelClick(event, option)}
                        sx={{
                          ml: 1,
                          color: 'error.main',
                          '&:hover': {
                            backgroundColor: 'error.light',
                            color: 'error.contrastText',
                          },
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                )}
              </li>
            )}
            renderInput={(params) => <TextField {...params} label="Modelo" />}
          />
        </Grid>
      </Grid>

      {brandId && (
        <>
          <AddModelDialog
            open={isAddModelDialogOpen}
            onClose={() => setAddModelDialogOpen(false)}
            onSuccess={handleNewModelSuccess}
            brandId={brandId}
          />
          <DeleteModelDialog
            open={!!modelToDelete}
            onClose={() => setModelToDelete(null)}
            onSuccess={handleDeleteSuccess}
            model={modelToDelete}
            brandId={brandId}
          />
        </>
      )}
    </Paper>
  );
};

export default VehicleNoteVehicleSelector;
