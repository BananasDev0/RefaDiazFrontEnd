import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
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
  ProductType,
} from '../../../types/product.types';
import CapDialog from './dialogs/CapDialog';

interface RadiatorComponentsManagerProps {
  isReadOnly: boolean;
  componentTypeId: ProductType;
  componentTypeLabel: string;
  componentTypePluralLabel: string;
  componentTypeArticle: 'el' | 'la';
}

type CapDialogMode = 'create' | 'edit' | 'view';

const getComponentTitle = (
  component: ProductComponentFormEntry,
  componentTypeLabel: string,
  componentTypeArticle: 'el' | 'la'
) => {
  if (component.source === 'existing' && component.draft) {
    return component.draft.name || `${componentTypeLabel} sin nombre`;
  }

  if (component.source === 'draft') {
    const prefix = componentTypeArticle === 'la' ? 'Nueva' : 'Nuevo';
    return component.draft.name || `${prefix} ${componentTypeLabel.toLowerCase()} sin nombre`;
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
    comments: component.componentProduct?.comments || '',
    files: component.componentProduct?.files || [],
    productProviders: component.componentProduct?.productProviders?.map((provider) => ({
      providerId: provider.providerId,
      numSeries: provider.numSeries,
      purchasePrice: provider.price.cost,
      providerName: provider.provider.name,
    })) || [],
  };
};

const RadiatorComponentsManager = ({
  isReadOnly,
  componentTypeId,
  componentTypeLabel,
  componentTypePluralLabel,
  componentTypeArticle,
}: RadiatorComponentsManagerProps) => {
  const { showSnackbar } = useSnackbar();
  const { control, getValues, setValue } = useFormContext<ProductFormData>();
  const components = useWatch({
    control,
    name: 'components',
  }) || [];
  const [isCapDialogOpen, setIsCapDialogOpen] = useState(false);
  const [isComponentDetailLoading, setIsComponentDetailLoading] = useState(false);
  const [dialogMode, setDialogMode] = useState<CapDialogMode>('create');
  const [selectedComponentIndex, setSelectedComponentIndex] = useState<number | null>(null);

  const setComponents = (nextComponents: ProductComponentFormEntry[], shouldMarkTouched = true) => {
    setValue('components', nextComponents, { shouldDirty: shouldMarkTouched });

    if (shouldMarkTouched) {
      setValue('componentsTouched', true, { shouldDirty: true });
    }
  };

  const filteredComponents = components.flatMap((component, index) => (
    component.productTypeId === componentTypeId ? [{ component, index }] : []
  ));

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
      const currentComponent = components[selectedComponentIndex];

      if (!currentComponent) {
        handleCloseCapDialog();
        return;
      }

      if (currentComponent.source === 'draft') {
        setComponents(components.map((component, index) => (
          index === selectedComponentIndex
            ? {
              ...currentComponent,
              draft,
            }
            : component
        )));
      } else {
        setComponents(components.map((component, index) => (
          index === selectedComponentIndex
            ? {
              ...currentComponent,
              draft,
              draftDirty: true,
            }
            : component
        )));
      }
    } else {
      setComponents([
        ...components,
        {
          productTypeId: componentTypeId,
          source: 'draft',
          tempId: uuidv4(),
          draft,
        },
      ]);
    }

    handleCloseCapDialog();
  };

  const handleOpenComponentDialog = async (index: number) => {
    const component = components[index];

    if (!component) {
      return;
    }

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
      const currentComponents = getValues('components');
      setComponents(currentComponents.map((entry, entryIndex) => (
        entryIndex === index
          ? {
            ...component,
            componentProduct: fullComponent as Product,
          }
          : entry
      )), false);
    } catch (error) {
      const message = error instanceof Error ? error.message : `No se pudo cargar el detalle del ${componentTypeLabel.toLowerCase()}.`;
      showSnackbar(`Error al cargar el ${componentTypeLabel.toLowerCase()}: ${message}`, 'error');
    } finally {
      setIsComponentDetailLoading(false);
    }
  };

  const handleRemoveComponent = (index: number) => {
    setComponents(components.filter((_, componentIndex) => componentIndex !== index));
  };

  const selectedComponent = selectedComponentIndex !== null
    ? components[selectedComponentIndex] || null
    : null;

  const dialogDefaultValues = selectedComponent ? toDraftFormData(selectedComponent) : undefined;
  const isDialogReadOnly = dialogMode === 'view' || isReadOnly;
  const detailPrefix = componentTypeArticle === 'la' ? 'Detalle de la' : 'Detalle del';
  const createPrefix = componentTypeArticle === 'la' ? 'Nueva' : 'Nuevo';
  const dialogTitle = dialogMode === 'edit'
    ? `Editar ${componentTypeLabel}`
    : dialogMode === 'view'
      ? `${detailPrefix} ${componentTypeLabel}`
      : `${createPrefix} ${componentTypeLabel}`;
  const dialogSubmitLabel = dialogMode === 'edit'
    ? 'Guardar Cambios'
    : `Agregar ${componentTypeLabel}`;

  return (
    <Box>
      {!isReadOnly && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button type="button" variant="contained" startIcon={<Add />} onClick={handleOpenCapDialog}>
            Agregar {componentTypeLabel}
          </Button>
        </Box>
      )}

      {filteredComponents.length === 0 ? (
        <Typography color="text.secondary">
          No hay {componentTypePluralLabel.toLowerCase()} asociados a este radiador.
        </Typography>
      ) : (
        <Stack spacing={2}>
          {filteredComponents.map(({ component, index }) => (
            <Paper
              key={component.source === 'draft' ? component.tempId : `${component.componentProductId}-${index}`}
              sx={{ p: 2, bgcolor: '#fff' }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <Box>
                  <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap' }}>
                    <Typography variant="subtitle1">
                      {getComponentTitle(component, componentTypeLabel, componentTypeArticle)}
                    </Typography>
                    <Chip
                      size="small"
                      label={component.source === 'draft'
                        ? (componentTypeArticle === 'la' ? 'Nueva' : 'Nuevo')
                        : 'Existente'}
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
                      aria-label={`Quitar ${componentTypeLabel.toLowerCase()}`}
                    >
                      <Delete />
                    </IconButton>
                  )}
                </Stack>
              </Box>
            </Paper>
          ))}
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
