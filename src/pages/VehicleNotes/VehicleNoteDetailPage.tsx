import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MarkdownContent from '../../components/common/MarkdownContent';
import PageHeader from '../../components/common/PageHeader';
import { useVehicleNote } from '../../hooks/useVehicleNotes';
import { getPublicStorageUrl } from '../../utils/storage';

const VehicleNoteDetailPage = () => {
  const navigate = useNavigate();
  const { noteId } = useParams<{ noteId: string }>();
  const numericNoteId = noteId ? Number(noteId) : null;
  const { data: note, isLoading, isError, error } = useVehicleNote(numericNoteId);

  const orderedImages = useMemo(
    () => [...(note?.files ?? [])].sort((a, b) => a.orderId - b.orderId),
    [note?.files]
  );

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !note) {
    return (
      <Alert severity="error">
        {error instanceof Error ? error.message : 'No fue posible cargar la nota.'}
      </Alert>
    );
  }

  return (
    <Box>
      <PageHeader
        title={note.title}
        actionButton={(
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/vehicle-notes')}
            >
              Volver
            </Button>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => navigate(`/vehicle-notes/edit/${note.id}`)}
            >
              Editar
            </Button>
          </Stack>
        )}
      />

      <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', rowGap: 1 }}>
        {note.carModel?.brand?.name && <Chip label={note.carModel.brand.name} variant="outlined" />}
        {note.carModel?.name && <Chip label={note.carModel.name} />}
        {!note.carModel && <Chip label="Nota general" />}
      </Stack>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <MarkdownContent content={note.contentMarkdown} testId="vehicle-note-detail-markdown" />
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Imagenes
            </Typography>
            {orderedImages.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                Esta nota no tiene imagenes adjuntas.
              </Typography>
            ) : (
              <Gallery>
                <Grid container spacing={1.5}>
                  {orderedImages.map((file) => {
                    const url = getPublicStorageUrl(file.storagePath);
                    return (
                      <Grid size={6} key={file.id ?? file.orderId}>
                        <Item original={url} width={1600} height={1200}>
                          {({ ref, open }) => (
                            <Box
                              component="img"
                              ref={ref}
                              onClick={open}
                              src={url}
                              alt={note.title}
                              sx={{
                                width: '100%',
                                height: 140,
                                objectFit: 'cover',
                                borderRadius: 2,
                                cursor: 'pointer',
                              }}
                            />
                          )}
                        </Item>
                      </Grid>
                    );
                  })}
                </Grid>
              </Gallery>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VehicleNoteDetailPage;
