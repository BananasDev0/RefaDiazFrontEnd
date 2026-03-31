import type { File as StoredFile } from './common.types';
import type { CarModel } from './model.types';

export interface VehicleNote {
  id?: number;
  title: string;
  contentMarkdown: string;
  carModelId?: number | null;
  carModel?: CarModel | null;
  files: StoredFile[];
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface VehicleNoteFilters {
  textSearch: string | null;
  brandId: number | null;
  carModelId: number | null;
}

export interface VehicleNoteFilePayload {
  id?: number;
  name: string;
  mimeType: string;
  storagePath: string;
  orderId: number;
  active?: boolean;
}

export interface VehicleNoteUpsertPayload {
  title: string;
  contentMarkdown: string;
  carModelId?: number | null;
  files?: VehicleNoteFilePayload[];
  active?: boolean;
}

export interface VehicleNoteFormData {
  title: string;
  contentMarkdown: string;
  brandId: number | null;
  carModelId: number | null;
  files: (StoredFile | File)[];
}
