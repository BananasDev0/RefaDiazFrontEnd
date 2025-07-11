import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as UserService from '../services/UserService';
import type { User } from '../types/user.types';
import { useSnackbar } from '../contexts/SnackbarContext';

const USERS_QUERY_KEY = ['users'];

export const useUsers = () => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  // Query to get the list of users
  const { data: users = [], isLoading, error, isError } = useQuery<User[]>({
    queryKey: USERS_QUERY_KEY,
    queryFn: UserService.getUsers,
  });

  // Mutation to create a new user
  const { mutate: createUser, isPending: isCreating } = useMutation({
    mutationFn: (userData: User & { password?: string }) => UserService.createUser(userData),
    onSuccess: () => {
      showSnackbar('Usuario creado exitosamente', 'success');
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
    onError: (err) => {
      showSnackbar(`Error al crear el usuario: ${err.message}`, 'error');
    },
  });

  // Mutation to update an existing user
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) => UserService.updateUser(id, data),
    onSuccess: () => {
      showSnackbar('Usuario actualizado exitosamente', 'success');
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
    onError: (err) => {
      showSnackbar(`Error al actualizar el usuario: ${err.message}`, 'error');
    },
  });

  // Mutation to delete a user
  const { mutate: deleteUser, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => UserService.deleteUser(id),
    onSuccess: () => {
      showSnackbar('Usuario eliminado exitosamente', 'success');
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
    onError: (err) => {
      showSnackbar(`Error al eliminar el usuario: ${err.message}`, 'error');
    },
  });

  return {
    users,
    isLoading,
    error,
    isError,
    createUser,
    isCreating,
    updateUser,
    isUpdating,
    deleteUser,
    isDeleting,
  };
};
