import { useState } from 'react';

/**
 * Estado compartido de las páginas CRUD: elemento seleccionado,
 * diálogo de formulario (ver/editar/crear) y diálogo de confirmación de borrado.
 */
export const useCrudDialogs = <T,>() => {
  const [selected, setSelected] = useState<T | null>(null);
  const [isFormOpen, setFormOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [viewMode, setViewMode] = useState(false);

  const openView = (item: T) => {
    setSelected(item);
    setViewMode(true);
    setFormOpen(true);
  };

  const openEdit = (item: T) => {
    setSelected(item);
    setViewMode(false);
    setFormOpen(true);
  };

  const openAdd = () => {
    setSelected(null);
    setViewMode(false);
    setFormOpen(true);
  };

  const openDelete = (item: T) => {
    setSelected(item);
    setDeleteOpen(true);
  };

  const closeAll = () => {
    setFormOpen(false);
    setDeleteOpen(false);
    setSelected(null);
    setViewMode(false);
  };

  return {
    selected,
    viewMode,
    isFormOpen,
    isDeleteOpen,
    openView,
    openEdit,
    openAdd,
    openDelete,
    closeAll,
  };
};
