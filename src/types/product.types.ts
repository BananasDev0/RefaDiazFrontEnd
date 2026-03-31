// src/types/product.types.ts
import type { CarModel } from './model.types';
import type { Provider } from './provider.types';
import type { File as StoredFile } from './common.types';
import type { ProductCategory } from './productCategory.types';

export type ProductType = 1 | 2 | 3 | 4;

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
  initialYear?: number | null;
  lastYear?: number | null;
  carModel: CarModel;
}

export interface ProductComponentRelation {
  componentProductId: number;
  componentProduct?: Product;
}

export interface Product {
  id?: number;
  name: string;
  productTypeId: ProductType;
  productCategoryId?: number | null;
  productCategory?: ProductCategory | null;
  comments?: string;
  stockCount: number | null;
  dpi?: string | null;
  files: StoredFile[];
  productProviders: ProviderProduct[];
  productPrices: ProductPrice[];
  productCarModels: ProductCarModel[];
  components?: ProductComponentRelation[];
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
  imageUrl?: string; // Para la URL pública de la imagen principal
}

export interface ProductFormCarModel {
  carModelId: number;
  initialYear?: number | null;
  lastYear?: number | null;
  brandName?: string; // For display purposes in the form
  modelName?: string; // For display purposes in the form
}

export interface ProductFormProvider {
  providerId: number;
  numSeries: string;
  purchasePrice: number;
  providerName?: string; // For display purposes
}

export interface ProductFormPrice {
  description: string;
  cost: number;
}

export interface ProductComponentDraftFormData {
  name: string;
  dpi: string;
  comments?: string;
  files: (StoredFile | File)[];
  productProviders: ProductFormProvider[];
}

export interface ExistingProductComponentFormEntry {
  source: 'existing';
  productTypeId: ProductType;
  componentProductId: number;
  componentProduct?: Product;
  draft?: ProductComponentDraftFormData;
  draftDirty?: boolean;
}

export interface DraftProductComponentFormEntry {
  source: 'draft';
  productTypeId: ProductType;
  tempId: string;
  draft: ProductComponentDraftFormData;
}

export type ProductComponentFormEntry =
  | ExistingProductComponentFormEntry
  | DraftProductComponentFormEntry;

// Corresponds to the data structure of the product form
export interface ProductFormData {
  // Basic Info
  name: string;
  dpi: string;
  stockCount: number;
  productCategoryId: number | null;
  comments?: string;

  // Images
  files: (StoredFile | File)[]; // Supports existing StoredFile and new browser File objects

  // Model Compatibility
  productCarModels: ProductFormCarModel[];

  // Providers
  productProviders: ProductFormProvider[];

  // Sale Prices
  productPrices: ProductFormPrice[];

  // Product Components
  components: ProductComponentFormEntry[];
  componentsTouched: boolean;
}
