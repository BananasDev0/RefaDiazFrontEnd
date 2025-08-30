import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import UsersHeader from './UsersHeader';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { useUsers } from '../../hooks/useUsers';
import { UsersTable } from './UsersTable';
import { UserDialog } from './UserDialog';
import type { UserFormData } from './UserForm';
import { RoleName, type User } from '../../types/user.types';
import dayjs from 'dayjs';

const UsersPage: React.FC = () => {
  const { users, isLoading, isError, error, createUser, updateUser, deleteUser, isCreating, isUpdating, isDeleting } = useUsers();

  const [isUserDialogOpen, setUserDialogOpen] = useState(false);
  const [isConfirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewMode, setViewMode] = useState(false);

  const handleOpenViewDialog = (user: User) => {
    setSelectedUser(user);
    setViewMode(true);
    setUserDialogOpen(true);
  };

  const handleOpenEditDialog = (user: User) => {
    setSelectedUser(user);
    setViewMode(false);
    setUserDialogOpen(true);
  };

  const handleOpenAddDialog = () => {
    setSelectedUser(null);
    setViewMode(false);
    setUserDialogOpen(true);
  };

  const handleOpenDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setConfirmDeleteDialogOpen(true);
  };

  const handleCloseDialogs = () => {
    setUserDialogOpen(false);
    setConfirmDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  const handleFormSubmit = (data: Partial<UserFormData>, userId?: string) => {
    // El mapa para convertir el nombre del rol a su ID sigue siendo necesario
    const roleIdMap: Record<string, number> = {
      [RoleName.ADMIN]: 1,
      [RoleName.EMPLOYEE]: 2,
    };

    // 1. Construimos un único objeto que se alinea con la estructura de `User`
    console.log('data', data);
    const userObject: Partial<User> & { password?: string } = {
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
    };

    if (userId) {
      // 2. Para ACTUALIZAR, llamamos a la mutación con el ID y el objeto User.
      // La mutación `updateUser` espera un objeto { id, data }, donde `data` es `Partial<User>`.
      updateUser({ id: userId, data: userObject }, { onSuccess: handleCloseDialogs });
    } else {
      // 3. Para CREAR, añadimos la contraseña al mismo objeto y llamamos a la mutación.
      userObject.password = data.password;
      createUser(userObject as User & { password?: string }, { onSuccess: handleCloseDialogs });
    }
};

  const handleConfirmDelete = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id, { onSuccess: handleCloseDialogs });
    }
  };

  const handleChangeRole = (user: User) => console.log('TODO: Cambiar Rol para', user);

  if (isError) {
    return <Typography color="error">Error: {error?.message || 'No se pudieron cargar los usuarios'}</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <UsersHeader onAddUser={handleOpenAddDialog} />

      <UsersTable
        users={users}
        isLoading={isLoading}
        onView={handleOpenViewDialog}
        onEdit={handleOpenEditDialog}
        onChangeRole={handleChangeRole}
        onDelete={handleOpenDeleteDialog}
      />

      {isUserDialogOpen && (
        <UserDialog
          open={isUserDialogOpen}
          onClose={handleCloseDialogs}
          onSubmit={handleFormSubmit}
          isSubmitting={isCreating || isUpdating}
          userToEdit={selectedUser}
          viewMode={viewMode}
        />
      )}

      {isConfirmDeleteDialogOpen && (
        <ConfirmDialog
          open={isConfirmDeleteDialogOpen}
          onClose={handleCloseDialogs}
          onConfirm={handleConfirmDelete}
          title="Confirmar Eliminación"
          description={`¿Estás seguro de que quieres eliminar al usuario "${selectedUser?.person?.name}"? Esta acción no se puede deshacer.`}
          isSubmitting={isDeleting}
        />
      )}
    </Box>
  );
};

export default UsersPage;