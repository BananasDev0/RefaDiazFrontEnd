import { useState, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductMutations } from '../../hooks/useProductMutations';
import type { Product } from '../../types/product.types';

/**
 * Estado y handlers compartidos por las cards de producto del catálogo:
 * menú contextual, navegación a edición y diálogo de confirmación de borrado.
 */
export const useProductCardActions = (product: Product, editPath: string) => {
  const navigate = useNavigate();
  const { deleteProduct, isDeleting } = useProductMutations();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const menuOpen = Boolean(anchorEl);

  const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuCloseFromMouse = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    handleMenuClose();
  };

  const handleCardClick = () => {
    if (product.id) {
      navigate(editPath);
    }
  };

  const handleEdit = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    if (product.id) {
      navigate(editPath);
    }

    handleMenuClose();
  };

  const handleDeleteClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setDialogOpen(true);
    handleMenuClose();
  };

  const handleConfirmDelete = () => {
    if (!product.id) {
      return;
    }

    deleteProduct(product.id, {
      onSuccess: () => {
        setDialogOpen(false);
      },
    });
  };

  const closeDialog = () => setDialogOpen(false);

  return {
    anchorEl,
    menuOpen,
    dialogOpen,
    isDeleting,
    closeDialog,
    handleMenuClick,
    handleMenuClose,
    handleMenuCloseFromMouse,
    handleCardClick,
    handleEdit,
    handleDeleteClick,
    handleConfirmDelete,
  };
};
