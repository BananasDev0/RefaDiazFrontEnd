// src/types/brand.types.ts
import type { File as StoredFile } from './common.types';

export interface BrandFilePayload {
  name: string;
  mimeType: string;
  storagePath: string;
}

export interface Brand {
  id: number;
  name: string;
  brandTypeId: number; // 1 para Automotriz, 2 para Carga Pesada
  file?: Partial<StoredFile> | null;
  imageUrl?: string; // Para la URL pública de la imagen
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface BrandFormData {
  name: string;
  brandTypeId: number;
  active: boolean;
  file: Partial<StoredFile> | globalThis.File | null;
}
