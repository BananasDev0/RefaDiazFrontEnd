import React from 'react';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import CrudPageHeader from '../../components/common/CrudPageHeader';
import { useCrudDialogs } from '../../hooks/useCrudDialogs';
import { useUsers } from '../../hooks/useUsers';
import { RoleName, type User } from '../../types/user.types';
import { UsersTable } from './UsersTable';
import { UserDialog } from './UserDialog';
import type { UserFormData } from './UserForm';

const roleIdMap: Record<string, number> = {
  [RoleName.ADMIN]: 1,
  [RoleName.EMPLOYEE]: 2,
};

/** Convierte los datos del formulario a la estructura `User` que espera la API. */
const mapFormToUser = (data: Partial<UserFormData>): Partial<User> => ({
  person: {
    name: data.name!,
    lastName: data.lastName,
    email: data.email!,
    phoneNumber: data.phoneNumber,
    address: data.address,
    birthDate: data.birthDate ? dayjs(data.birthDate).format('YYYY-MM-DD') : undefined,
  },
  role: data.role ? {
    id: roleIdMap[data.role],
    description: data.role,
  } : undefined,
});

const UsersPage: React.FC = () => {
  const { users, isLoading, isError, error, createUser, updateUser, deleteUser, isCreating, isUpdating, isDeleting } = useUsers();
  const dialogs = useCrudDialogs<User>();

  const handleFormSubmit = (data: Partial<UserFormData>, userId?: string) => {
    const userObject: Partial<User> & { password?: string } = mapFormToUser(data);

    if (userId) {
      updateUser({ id: userId, data: userObject }, { onSuccess: dialogs.closeAll });
    } else {
      userObject.password = data.password;
      createUser(userObject as User & { password?: string }, { onSuccess: dialogs.closeAll });
    }
  };

  const handleConfirmDelete = () => {
    if (dialogs.selected) {
      deleteUser(dialogs.selected.id, { onSuccess: dialogs.closeAll });
    }
  };

  if (isError) {
    return <Typography color="error">Error: {error?.message || 'No se pudieron cargar los usuarios'}</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <CrudPageHeader title="Gestión de Usuarios" addLabel="Agregar Usuario" onAdd={dialogs.openAdd} />

      <UsersTable
        users={users}
        isLoading={isLoading}
        onView={dialogs.openView}
        onEdit={dialogs.openEdit}
        onDelete={dialogs.openDelete}
      />

      {dialogs.isFormOpen && (
        <UserDialog
          open={dialogs.isFormOpen}
          onClose={dialogs.closeAll}
          onSubmit={handleFormSubmit}
          isSubmitting={isCreating || isUpdating}
          userToEdit={dialogs.selected}
          viewMode={dialogs.viewMode}
        />
      )}

      {dialogs.isDeleteOpen && (
        <ConfirmDialog
          open={dialogs.isDeleteOpen}
          onClose={dialogs.closeAll}
          onConfirm={handleConfirmDelete}
          title="Confirmar Eliminación"
          description={`¿Estás seguro de que quieres eliminar al usuario "${dialogs.selected?.person?.name}"? Esta acción no se puede deshacer.`}
          isSubmitting={isDeleting}
        />
      )}
    </Box>
  );
};

export default UsersPage;
