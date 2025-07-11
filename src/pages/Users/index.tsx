// src/pages/Users/index.tsx
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

// Importa el UsersHeader que ya creaste
import UsersHeader from './UsersHeader'; 
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { useUsers } from '../../hooks/useUsers';
import { UsersTable } from './UsersTable';
import { UserDialog } from './UserDialog';
import type { UserFormData } from './UserForm';
import { RoleName, type User } from '../../types/user.types';

const UsersPage: React.FC = () => {
  // El hook y los estados se mantienen igual
  const { users, isLoading, isError, error, createUser, updateUser, deleteUser, isCreating, isUpdating, isDeleting } = useUsers();

  const [isUserDialogOpen, setUserDialogOpen] = useState(false);
  const [isConfirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewMode, setViewMode] = useState(false);

  // --- Handlers (sin cambios) ---

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
  
  // Este handler será pasado al UsersHeader
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
    const roleIdMap: Record<string, number> = {
      [RoleName.ADMIN]: 1,
      [RoleName.EMPLOYEE]: 2, 
    };

    const userPayload = {
      person: {
        name: data.name!,
        lastName: data.lastName,
        email: data.email!,
      },
      role: data.role ? {
        id: roleIdMap[data.role],
        description: data.role as RoleName,
      } : undefined,
      password: data.password,
    };

    if (userId) {
      // Para actualizar, quitamos la contraseña y el rol si no se debe cambiar
      const updatePayload = {
        person: userPayload.person,
        role: userPayload.role
      };
      updateUser({ id: userId, data: updatePayload }, { onSuccess: handleCloseDialogs });
    } else {
      // Para crear, usamos el payload completo que incluye la contraseña
      createUser(userPayload as User & { password?: string }, { onSuccess: handleCloseDialogs });
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
      {/* AQUÍ ESTÁ LA CORRECCIÓN: 
        Usamos tu componente UsersHeader y le pasamos la función que necesita.
      */}
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