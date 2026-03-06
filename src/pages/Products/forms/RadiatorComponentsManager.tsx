import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

import { useSnackbar } from '../../../contexts/SnackbarContext';
import { getProductById } from '../../../services/ProductService';
import type {
  Product,
  ProductComponentDraftFormData,
  ProductComponentFormEntry,
  ProductFormData,
} from '../../../types/product.types';
import CapDialog from './dialogs/CapDialog';

interface RadiatorComponentsManagerProps {
  isReadOnly: boolean;
}

type CapDialogMode = 'create' | 'edit' | 'view';

const getComponentTitle = (component: ProductComponentFormEntry) => {
  if (component.source === 'existing' && component.draft) {
    return component.draft.name || 'Tapa sin nombre';
  }

  if (component.source === 'draft') {
    return component.draft.name || 'Nueva tapa sin nombre';
  }

  return component.componentProduct?.name || `Componente #${component.componentProductId}`;
};

const getComponentSubtitle = (component: ProductComponentFormEntry) => {
  if (component.source === 'existing' && component.draft) {
    return component.draft.dpi || 'Sin DPI';
  }

  if (component.source === 'draft') {
    return component.draft.dpi || 'Sin DPI';
  }

  return component.componentProduct?.dpi || `ID ${component.componentProductId}`;
};

const toDraftFormData = (component: ProductComponentFormEntry): ProductComponentDraftFormData => {
  if (component.source === 'draft') {
    return component.draft;
  }

  if (component.draft) {
    return component.draft;
  }

  return {
    name: component.componentProduct?.name || '',
    dpi: component.componentProduct?.dpi || '',
    files: component.componentProduct?.files || [],
    productProviders: component.componentProduct?.productProviders?.map((provider) => ({
      providerId: provider.providerId,
      numSeries: provider.numSeries,
      purchasePrice: provider.price.cost,
      providerName: provider.provider.name,
    })) || [],
  };
};

const RadiatorComponentsManager = ({ isReadOnly }: RadiatorComponentsManagerProps) => {
  const { showSnackbar } = useSnackbar();
  const { control, setValue } = useFormContext<ProductFormData>();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'components',
  });
  const [isCapDialogOpen, setIsCapDialogOpen] = useState(false);
  const [isComponentDetailLoading, setIsComponentDetailLoading] = useState(false);
  const [dialogMode, setDialogMode] = useState<CapDialogMode>('create');
  const [selectedComponentIndex, setSelectedComponentIndex] = useState<number | null>(null);

  const handleOpenCapDialog = () => {
    setDialogMode('create');
    setSelectedComponentIndex(null);
    setIsCapDialogOpen(true);
  };

  const handleCloseCapDialog = () => {
    setIsCapDialogOpen(false);
    setIsComponentDetailLoading(false);
    setDialogMode('create');
    setSelectedComponentIndex(null);
  };

  const handleAddDraftCap = (draft: ProductComponentDraftFormData) => {
    if (dialogMode === 'edit' && selectedComponentIndex !== null) {
      const currentComponent = fields[selectedComponentIndex] as unknown as ProductComponentFormEntry;

      if (currentComponent.source === 'draft') {
        update(selectedComponentIndex, {
          ...currentComponent,
          draft,
        });
      } else {
        update(selectedComponentIndex, {
          ...currentComponent,
          draft,
          draftDirty: true,
        });
      }
    } else {
      append({
        source: 'draft',
        tempId: uuidv4(),
        draft,
      });
    }

    setValue('componentsTouched', true, { shouldDirty: true });
    handleCloseCapDialog();
  };

  const handleOpenComponentDialog = async (index: number) => {
    const component = fields[index] as unknown as ProductComponentFormEntry;

    setSelectedComponentIndex(index);
    setDialogMode(!isReadOnly ? 'edit' : 'view');
    setIsCapDialogOpen(true);

    if (component.source !== 'existing') {
      return;
    }

    if (
      component.draft ||
      (
        component.componentProduct?.files !== undefined &&
        component.componentProduct?.productProviders !== undefined
      )
    ) {
      return;
    }

    setIsComponentDetailLoading(true);

    try {
      const fullComponent = await getProductById(component.componentProductId);
      update(index, {
        ...component,
        componentProduct: fullComponent as Product,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No se pudo cargar el detalle de la tapa.';
      showSnackbar(`Error al cargar la tapa: ${message}`, 'error');
    } finally {
      setIsComponentDetailLoading(false);
    }
  };

  const handleRemoveComponent = (index: number) => {
    remove(index);
    setValue('componentsTouched', true, { shouldDirty: true });
  };

  const selectedComponent = selectedComponentIndex !== null
    ? fields[selectedComponentIndex] as unknown as ProductComponentFormEntry
    : null;

  const dialogDefaultValues = selectedComponent ? toDraftFormData(selectedComponent) : undefined;
  const isDialogReadOnly = dialogMode === 'view' || isReadOnly;
  const dialogTitle = dialogMode === 'edit'
    ? 'Editar Tapa'
    : dialogMode === 'view'
      ? 'Detalle de la Tapa'
      : 'Nueva Tapa';
  const dialogSubmitLabel = dialogMode === 'edit' ? 'Guardar Cambios' : 'Agregar Tapa';

  return (
    <Box>
      {!isReadOnly && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button type="button" variant="contained" startIcon={<Add />} onClick={handleOpenCapDialog}>
            Agregar Tapa
          </Button>
        </Box>
      )}

      {fields.length === 0 ? (
        <Typography color="text.secondary">
          No hay tapas asociadas a este radiador.
        </Typography>
      ) : (
        <Stack spacing={2}>
          {fields.map((field, index) => {
            const component = field as unknown as ProductComponentFormEntry;

            return (
              <Paper key={field.id} sx={{ p: 2, bgcolor: '#fff' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                  <Box>
                    <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap' }}>
                      <Typography variant="subtitle1">{getComponentTitle(component)}</Typography>
                      <Chip
                        size="small"
                        label={component.source === 'draft' ? 'Nueva' : 'Existente'}
                        color={component.source === 'draft' ? 'primary' : 'default'}
                      />
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {getComponentSubtitle(component)}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1} alignItems="flex-start">
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={() => void handleOpenComponentDialog(index)}
                    >
                      {!isReadOnly ? 'Editar' : 'Ver'}
                    </Button>
                    {!isReadOnly && (
                      <IconButton
                        type="button"
                        onClick={() => handleRemoveComponent(index)}
                        color="error"
                        aria-label="Quitar tapa"
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </Stack>
                </Box>
              </Paper>
            );
          })}
        </Stack>
      )}

      <CapDialog
        open={isCapDialogOpen}
        onClose={handleCloseCapDialog}
        onSubmit={handleAddDraftCap}
        defaultValues={dialogDefaultValues}
        readOnly={isDialogReadOnly}
        isLoading={isComponentDetailLoading}
        title={dialogTitle}
        submitLabel={dialogSubmitLabel}
      />
    </Box>
  );
};

export default RadiatorComponentsManager;
