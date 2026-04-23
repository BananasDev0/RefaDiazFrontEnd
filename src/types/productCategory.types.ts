export interface ProductCategory {
  id: number;
  name: string;
  description?: string;
  productTypeId: number;
  orderId?: number;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductCategoryPayload {
  name: string;
  productTypeId: number;
  description?: string;
  orderId?: number;
  active: boolean;
}
