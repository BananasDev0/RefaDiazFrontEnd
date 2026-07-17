import { useSearchParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import CrudPageHeader from '../../components/common/CrudPageHeader';
import { useBrandList, useBrandManagement } from '../../hooks/useBrandManagement';
import { useCrudDialogs } from '../../hooks/useCrudDialogs';
import type { Brand, BrandFormData } from '../../types/brand.types';
import BrandDialog from './BrandDialog';
import BrandTextSearchFilter from './BrandTextSearchFilter';
import BrandsTable from './BrandsTable';

const BrandsPage = () => {
  const [searchParams] = useSearchParams();
  const searchName = searchParams.get('name');
  const {
    createBrand,
    isCreating,
    updateBrand,
    isUpdating,
    deleteBrand,
    isDeleting,
  } = useBrandManagement({ includeList: false });
  const {
    data: brands = [],
    isLoading,
    isError,
    error,
  } = useBrandList(searchName);
  const dialogs = useCrudDialogs<Brand>();

  const handleFormSubmit = (data: BrandFormData, brandId?: number) => {
    if (brandId) {
      updateBrand({ id: brandId, data }, { onSuccess: dialogs.closeAll });
      return;
    }

    createBrand(data, { onSuccess: dialogs.closeAll });
  };

  const handleConfirmDelete = () => {
    if (!dialogs.selected) {
      return;
    }

    deleteBrand(dialogs.selected.id, { onSuccess: dialogs.closeAll });
  };

  if (isError) {
    return <Typography color="error">Error: {error?.message || 'No se pudieron cargar las marcas'}</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <CrudPageHeader title="Administracion de Marcas" addLabel="Agregar Marca" onAdd={dialogs.openAdd} />
      <Box sx={{ mb: 3 }}>
        <BrandTextSearchFilter />
      </Box>

      <BrandsTable
        brands={brands}
        isLoading={isLoading}
        onView={dialogs.openView}
        onEdit={dialogs.openEdit}
        onDelete={dialogs.openDelete}
      />

      {dialogs.isFormOpen && (
        <BrandDialog
          open={dialogs.isFormOpen}
          onClose={dialogs.closeAll}
          onSubmit={handleFormSubmit}
          isSubmitting={isCreating || isUpdating}
          brandToEdit={dialogs.selected}
          viewMode={dialogs.viewMode}
        />
      )}

      {dialogs.isDeleteOpen && (
        <ConfirmDialog
          open={dialogs.isDeleteOpen}
          onClose={dialogs.closeAll}
          onConfirm={handleConfirmDelete}
          title="Confirmar Eliminación"
          description={`¿Estás seguro de que quieres eliminar la marca "${dialogs.selected?.name}"? Esta acción no se puede deshacer.`}
          isSubmitting={isDeleting}
        />
      )}
    </Box>
  );
};

export default BrandsPage;
