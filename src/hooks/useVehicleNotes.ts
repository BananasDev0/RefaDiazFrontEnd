import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../contexts/SnackbarContext';
import {
  createVehicleNote,
  deleteVehicleNote,
  getVehicleNoteById,
  getVehicleNotes,
  updateVehicleNote,
} from '../services/VehicleNotesService';
import type {
  VehicleNoteFilters,
  VehicleNoteUpsertPayload,
} from '../types/vehicleNote.types';

export const useVehicleNotes = (filters: VehicleNoteFilters) => {
  return useQuery({
    queryKey: ['vehicle-notes', filters],
    queryFn: () => getVehicleNotes(filters),
  });
};

export const useVehicleNote = (noteId: number | null) => {
  return useQuery({
    queryKey: ['vehicle-note', noteId],
    queryFn: () => {
      if (!noteId) {
        return Promise.reject(new Error('Vehicle note ID is required'));
      }

      return getVehicleNoteById(noteId);
    },
    enabled: !!noteId,
  });
};

export const useVehicleNoteMutations = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const createVehicleNoteMutation = useMutation({
    mutationFn: (noteData: VehicleNoteUpsertPayload) => createVehicleNote(noteData),
    onSuccess: (data) => {
      showSnackbar('Nota creada exitosamente', 'success');
      queryClient.invalidateQueries({ queryKey: ['vehicle-notes'] });
      navigate(`/vehicle-notes/edit/${data.id}`, { replace: true });
    },
    onError: (error: Error) => {
      showSnackbar(`Error al crear la nota: ${error.message}`, 'error');
    },
  });

  const updateVehicleNoteMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: VehicleNoteUpsertPayload }) =>
      updateVehicleNote(id, data),
    onSuccess: (_, variables) => {
      showSnackbar('Nota actualizada exitosamente', 'success');
      queryClient.invalidateQueries({ queryKey: ['vehicle-notes'] });
      queryClient.invalidateQueries({ queryKey: ['vehicle-note', variables.id] });
    },
    onError: (error: Error) => {
      showSnackbar(`Error al actualizar la nota: ${error.message}`, 'error');
    },
  });

  const deleteVehicleNoteMutation = useMutation({
    mutationFn: (id: number) => deleteVehicleNote(id),
    onSuccess: () => {
      showSnackbar('Nota eliminada exitosamente', 'success');
      queryClient.invalidateQueries({ queryKey: ['vehicle-notes'] });
      navigate('/vehicle-notes');
    },
    onError: (error: Error) => {
      showSnackbar(`Error al eliminar la nota: ${error.message}`, 'error');
    },
  });

  return {
    createVehicleNote: createVehicleNoteMutation.mutateAsync,
    isCreating: createVehicleNoteMutation.isPending,
    updateVehicleNote: updateVehicleNoteMutation.mutateAsync,
    isUpdating: updateVehicleNoteMutation.isPending,
    deleteVehicleNote: deleteVehicleNoteMutation.mutateAsync,
    isDeleting: deleteVehicleNoteMutation.isPending,
  };
};
