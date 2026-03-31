import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { useBrandManagement } from '../../hooks/useBrandManagement';
import type { Brand, BrandFormData } from '../../types/brand.types';
import BrandDialog from './BrandDialog';
import BrandsHeader from './BrandsHeader';
import BrandsTable from './BrandsTable';

const BrandsPage = () => {
  const {
    brands,
    isLoading,
    isError,
    error,
    createBrand,
    isCreating,
    updateBrand,
    isUpdating,
    deleteBrand,
    isDeleting,
  } = useBrandManagement();
  const [isBrandDialogOpen, setBrandDialogOpen] = useState(false);
  const [isConfirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [viewMode, setViewMode] = useState(false);

  const handleOpenViewDialog = (brand: Brand) => {
    setSelectedBrand(brand);
    setViewMode(true);
    setBrandDialogOpen(true);
  };

  const handleOpenEditDialog = (brand: Brand) => {
    setSelectedBrand(brand);
    setViewMode(false);
    setBrandDialogOpen(true);
  };

  const handleOpenAddDialog = () => {
    setSelectedBrand(null);
    setViewMode(false);
    setBrandDialogOpen(true);
  };

  const handleOpenDeleteDialog = (brand: Brand) => {
    setSelectedBrand(brand);
    setConfirmDeleteDialogOpen(true);
  };

  const handleCloseDialogs = () => {
    setBrandDialogOpen(false);
    setConfirmDeleteDialogOpen(false);
    setSelectedBrand(null);
  };

  const handleFormSubmit = (data: BrandFormData, brandId?: number) => {
    if (brandId) {
      updateBrand({ id: brandId, data }, { onSuccess: handleCloseDialogs });
      return;
    }

    createBrand(data, { onSuccess: handleCloseDialogs });
  };

  const handleConfirmDelete = () => {
    if (!selectedBrand) {
      return;
    }

    deleteBrand(selectedBrand.id, { onSuccess: handleCloseDialogs });
  };

  if (isError) {
    return <Typography color="error">Error: {error?.message || 'No se pudieron cargar las marcas'}</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <BrandsHeader onAddBrand={handleOpenAddDialog} />

      <BrandsTable
        brands={brands}
        isLoading={isLoading}
        onView={handleOpenViewDialog}
        onEdit={handleOpenEditDialog}
        onDelete={handleOpenDeleteDialog}
      />

      {isBrandDialogOpen && (
        <BrandDialog
          open={isBrandDialogOpen}
          onClose={handleCloseDialogs}
          onSubmit={handleFormSubmit}
          isSubmitting={isCreating || isUpdating}
          brandToEdit={selectedBrand}
          viewMode={viewMode}
        />
      )}

      {isConfirmDeleteDialogOpen && (
        <ConfirmDialog
          open={isConfirmDeleteDialogOpen}
          onClose={handleCloseDialogs}
          onConfirm={handleConfirmDelete}
          title="Confirmar Eliminación"
          description={`¿Estás seguro de que quieres eliminar la marca "${selectedBrand?.name}"? Esta acción no se puede deshacer.`}
          isSubmitting={isDeleting}
        />
      )}
    </Box>
  );
};

export default BrandsPage;
