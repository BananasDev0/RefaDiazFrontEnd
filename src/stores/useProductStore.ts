import { create } from 'zustand';
import type { Product } from '../types/product.types'; // Asumimos que el tipo Product existe

// Definimos la estructura de nuestros filtros
export interface ProductFilters {
  textSearch: string | null;
  brandId: number | null;
  modelId: number | null;
  year: number | null;
}

// Definimos la estructura completa del estado y sus acciones
type ProductState = {
  productType: string | null;
  filters: ProductFilters;
  isModalOpen: boolean;
  productForModal: Product | null;
  setProductType: (productType: string | null) => void;
  setFilters: (filters: ProductFilters) => void;
  openModal: (product?: Product) => void;
  closeModal: () => void;
};

// Estado inicial para los filtros
const initialFilters: ProductFilters = {
  textSearch: null,
  brandId: null,
  modelId: null,
  year: null,
};

export const useProductStore = create<ProductState>((set) => ({
  // Estado inicial del store
  productType: null,
  filters: initialFilters,
  isModalOpen: false,
  productForModal: null,

  // --- Acciones para mutar el estado ---
  setProductType: (productType) => set({ productType }),

  setFilters: (filters) => set({ filters }),

  openModal: (product) => set({ 
    isModalOpen: true, 
    productForModal: product 
  }),

  closeModal: () => set({ 
    isModalOpen: false, 
    productForModal: null 
  }),
}));