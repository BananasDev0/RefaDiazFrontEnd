// src/types/product.types.ts
import type { CarModel } from './model.types';
import type { Provider } from './provider.types';
import type { File as StoredFile } from './common.types';

export type ProductType = 1 | 2 | 3;

export interface Price {
  id?: number;
  description: string;
  cost: number;
}

export interface ProductPrice {
  productId?: number;
  priceId?: number;
  price: Price;
}

export interface ProviderProduct {
  providerId: number;
  productId?: number;
  priceId?: number;
  numSeries: string;
  price: Price;
  provider: Provider;
}

export interface ProductCarModel {
  productId?: number;
  carModelId: number;
  initialYear: number;
  lastYear: number;
  carModel: CarModel;
}

export interface Product {
  id?: number;
  name: string;
  productTypeId: ProductType;
  comments?: string;
  stockCount: number;
  dpi?: string;
  files: StoredFile[];
  productProviders: ProviderProduct[];
  productPrices: ProductPrice[];
  productCarModels: ProductCarModel[];
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
  imageUrl?: string; // Para la URL pública de la imagen principal
}

// Corresponds to the data structure of the product form
export interface ProductFormData {
  // Basic Info
  name: string;
  dpi: string;
  stockCount: number;
  comments?: string;

  // Images
  files: (StoredFile | File)[]; // Supports existing StoredFile and new browser File objects

  // Model Compatibility
  productCarModels: {
    carModelId: number;
    initialYear: number;
    lastYear: number;
  }[];

  // Providers
  productProviders: {
    providerId: number;
    numSeries: string;
    purchasePrice: number;
  }[];

  // Sale Prices
  productPrices: {
    description: string;
    cost: number;
  }[];
}