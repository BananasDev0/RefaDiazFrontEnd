// src/types/provider.types.ts

export interface Provider {
  id: number;
  name: string;
  phoneNumber: string;
  address: string;
  comments?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}