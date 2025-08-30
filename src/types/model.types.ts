// src/types/model.types.ts
import type { Brand } from './brand.types';

export interface CarModel {
  id: number;
  name: string;
  brandId: number;
  brand?: Brand;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}