// src/types/brand.types.ts
import type { File } from './common.types';

export interface Brand {
  id: number;
  name: string;
  brandTypeId: number; // 1 para Automotriz, 2 para Carga Pesada
  file?: File;
  imageUrl?: string; // Para la URL pública de la imagen
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}