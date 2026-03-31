import { useMemo } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import type { VehicleNoteFilters } from '../../types/vehicleNote.types';
import { useVehicleNotes } from '../../hooks/useVehicleNotes';
import VehicleNoteCard from './VehicleNoteCard';
import VehicleNoteFilterBar from './VehicleNoteFilterBar';

const getFiltersFromSearchParams = (searchParams: URLSearchParams): VehicleNoteFilters => ({
  textSearch: searchParams.get('q'),
  brandId: searchParams.get('brandId') ? Number(searchParams.get('brandId')) : null,
  carModelId: searchParams.get('carModelId') ? Number(searchParams.get('carModelId')) : null,
});

const VehicleNotesCatalog = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(
    () => getFiltersFromSearchParams(searchParams),
    [searchParams]
  );

  const { data: notes = [], isLoading } = useVehicleNotes(filters);

  const handleFiltersChange = (nextFilters: VehicleNoteFilters) => {
    const nextSearchParams = new URLSearchParams();

    if (nextFilters.textSearch) {
      nextSearchParams.set('q', nextFilters.textSearch);
    }

    if (nextFilters.brandId) {
      nextSearchParams.set('brandId', String(nextFilters.brandId));
    }

    if (nextFilters.carModelId) {
      nextSearchParams.set('carModelId', String(nextFilters.carModelId));
    }

    setSearchParams(nextSearchParams);
  };

  return (
    <Box>
      <PageHeader
        title="Base de Conocimiento"
        actionButton={(
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/vehicle-notes/new')}
          >
            Nueva nota
          </Button>
        )}
      />
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Documenta procedimientos, diagnosticos y recomendaciones ligadas a vehiculos o de uso general.
      </Typography>

      <VehicleNoteFilterBar filters={filters} onChange={handleFiltersChange} />

      {isLoading ? (
        <Grid container spacing={3}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
              <Card>
                <CardHeader
                  title={<Skeleton width="70%" />}
                  subheader={<Skeleton width="40%" />}
                />
                <CardContent>
                  <Skeleton variant="rectangular" height={160} sx={{ mb: 2 }} />
                  <Skeleton />
                  <Skeleton width="85%" />
                  <Skeleton width="60%" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : notes.length === 0 ? (
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No se encontraron notas con los filtros aplicados.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {notes.map((note) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={note.id}>
              <VehicleNoteCard note={note} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default VehicleNotesCatalog;
