import { useEffect } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import type { File as AppFile } from '../../types/common.types';
import PageHeader from '../../components/common/PageHeader';
import { useVehicleNote, useVehicleNoteMutations } from '../../hooks/useVehicleNotes';
import { VehicleNoteImageService } from '../../services/VehicleNoteImageService';
import type {
  VehicleNote,
  VehicleNoteFilePayload,
  VehicleNoteFormData,
  VehicleNoteUpsertPayload,
} from '../../types/vehicleNote.types';
import VehicleNoteImageManager from './forms/VehicleNoteImageManager';
import VehicleNoteVehicleSelector from './forms/VehicleNoteVehicleSelector';
import { vehicleNoteSchema } from './vehicleNoteSchema';

const transformVehicleNoteToFormData = (note: VehicleNote): VehicleNoteFormData => ({
  title: note.title ?? '',
  contentMarkdown: note.contentMarkdown ?? '',
  brandId: note.carModel?.brand?.id ?? note.carModel?.brandId ?? null,
  carModelId: note.carModelId ?? null,
  files: note.files ?? [],
});

const mapFilesToPayload = (files: Partial<AppFile>[]): VehicleNoteFilePayload[] => (
  files.map((file) => ({
    id: file.id,
    name: file.name ?? '',
    mimeType: file.mimeType ?? '',
    storagePath: file.storagePath ?? '',
    orderId: file.orderId ?? 0,
  }))
);

const buildPayload = async (
  formData: VehicleNoteFormData,
  includeFiles: boolean
): Promise<VehicleNoteUpsertPayload> => {
  const uploadedFiles = await VehicleNoteImageService.uploadFiles(formData.files as AppFile[]);
  const payload: VehicleNoteUpsertPayload = {
    title: formData.title.trim(),
    contentMarkdown: formData.contentMarkdown.trim(),
    carModelId: formData.carModelId ?? null,
  };

  if (includeFiles || uploadedFiles.length > 0) {
    payload.files = mapFilesToPayload(uploadedFiles);
  }

  return payload;
};

const VehicleNoteFormPage = () => {
  const navigate = useNavigate();
  const { noteId } = useParams<{ noteId: string }>();
  const isEditMode = !!noteId;
  const numericNoteId = isEditMode ? Number(noteId) : null;

  const { data: note, isLoading, isError, error } = useVehicleNote(numericNoteId);
  const {
    createVehicleNote,
    isCreating,
    updateVehicleNote,
    isUpdating,
  } = useVehicleNoteMutations();

  const methods = useForm<VehicleNoteFormData>({
    // @ts-expect-error - Yup schema type inference issue
    resolver: yupResolver(vehicleNoteSchema),
    defaultValues: {
      title: '',
      contentMarkdown: '',
      brandId: null,
      carModelId: null,
      files: [],
    },
  });

  useEffect(() => {
    if (isEditMode && note) {
      methods.reset(transformVehicleNoteToFormData(note));
    }
  }, [isEditMode, methods, note]);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = methods;

  const submitVehicleNote = async (formData: VehicleNoteFormData) => {
    const payload = await buildPayload(formData, isEditMode);

    if (isEditMode && numericNoteId) {
      await updateVehicleNote({ id: numericNoteId, data: payload });
      return;
    }

    await createVehicleNote(payload);
  };

  if (isEditMode && isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isEditMode && (isError || !note)) {
    return (
      <Alert severity="error">
        {error instanceof Error ? error.message : 'No fue posible cargar la nota.'}
      </Alert>
    );
  }

  const isSubmitting = isCreating || isUpdating;
  const handleFormSubmit = handleSubmit(async (formData) => {
    await submitVehicleNote(formData as unknown as VehicleNoteFormData);
  });

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={(event) => {
          void handleFormSubmit(event);
        }}
      >
        <PageHeader
          title={isEditMode ? 'Editar nota de vehiculo' : 'Nueva nota de vehiculo'}
          actionButton={(
            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : 'Guardar'}
            </Button>
          )}
        />

        <Box sx={{ mb: 3 }}>
          <Button
            variant="text"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(isEditMode && numericNoteId ? `/vehicle-notes/${numericNoteId}` : '/vehicle-notes')}
          >
            Volver
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid size={12}>
            <Paper sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, lg: 7 }}>
                  <Paper elevation={2} sx={{ p: 3, bgcolor: 'background.default', height: '100%' }}>
                    <Controller
                      name="title"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Titulo"
                          error={!!errors.title}
                          helperText={errors.title?.message}
                        />
                      )}
                    />
                    <Controller
                      name="contentMarkdown"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          multiline
                          minRows={14}
                          label="Contenido"
                          error={!!errors.contentMarkdown}
                          helperText={errors.contentMarkdown?.message}
                          sx={{ mt: 3 }}
                        />
                      )}
                    />
                  </Paper>
                </Grid>
                <Grid size={{ xs: 12, lg: 5 }}>
                  <VehicleNoteImageManager />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid size={12}>
            <VehicleNoteVehicleSelector />
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
};

export default VehicleNoteFormPage;
