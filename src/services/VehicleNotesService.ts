import axiosInstance from './axiosConfig';
import type {
  VehicleNote,
  VehicleNoteFilters,
  VehicleNoteUpsertPayload,
} from '../types/vehicleNote.types';

const VEHICLE_NOTES_ENDPOINT = '/vehicle-notes';

export const getVehicleNotes = async (
  filters: VehicleNoteFilters
): Promise<VehicleNote[]> => {
  const params = {
    q: filters.textSearch,
    brandId: filters.brandId,
    carModelId: filters.carModelId,
  };

  return axiosInstance.get(VEHICLE_NOTES_ENDPOINT, { params });
};

export const getVehicleNoteById = async (noteId: number): Promise<VehicleNote> => {
  return axiosInstance.get(`${VEHICLE_NOTES_ENDPOINT}?id=${noteId}`);
};

export const createVehicleNote = async (
  noteData: VehicleNoteUpsertPayload
): Promise<VehicleNote> => {
  return axiosInstance.post(VEHICLE_NOTES_ENDPOINT, noteData);
};

export const updateVehicleNote = async (
  noteId: number,
  noteData: VehicleNoteUpsertPayload
): Promise<VehicleNote> => {
  return axiosInstance.put(`${VEHICLE_NOTES_ENDPOINT}?id=${noteId}`, noteData);
};

export const deleteVehicleNote = async (noteId: number): Promise<VehicleNote> => {
  return axiosInstance.delete(`${VEHICLE_NOTES_ENDPOINT}?id=${noteId}`);
};
