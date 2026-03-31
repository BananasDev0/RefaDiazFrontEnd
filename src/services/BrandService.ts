import axiosInstance from './axiosConfig';
import { BrandImageService } from './BrandImageService';
import type { Brand, BrandFilePayload, BrandFormData } from '../types/brand.types';

interface BrandPayload {
  name: string;
  brandTypeId: number;
  active: boolean;
  file?: BrandFilePayload;
}

const resolveBrandFilePayload = async (
  file: BrandFormData['file'],
  brandName: string
): Promise<BrandFilePayload | undefined> => {
  if (!file) {
    return undefined;
  }

  if (file instanceof globalThis.File) {
    return BrandImageService.uploadLogo(file, brandName);
  }

  if (!file.storagePath) {
    return undefined;
  }

  return {
    name: file.name || `${brandName} Logo`,
    mimeType: file.mimeType || 'image/png',
    storagePath: file.storagePath,
  };
};

const mapBrandFormToPayload = async (brandData: BrandFormData): Promise<BrandPayload> => {
  const payload: BrandPayload = {
    name: brandData.name,
    brandTypeId: brandData.brandTypeId,
    active: brandData.active,
  };

  const filePayload = await resolveBrandFilePayload(brandData.file, brandData.name);

  if (filePayload) {
    payload.file = filePayload;
  }

  return payload;
};

export const getBrands = async (): Promise<Brand[]> => {
  return axiosInstance.get('/brands');
};

export const createBrand = async (brandData: BrandFormData): Promise<Brand> => {
  const payload = await mapBrandFormToPayload(brandData);
  return axiosInstance.post('/brands', payload);
};

export const updateBrand = async (id: number, brandData: BrandFormData): Promise<Brand> => {
  const payload = await mapBrandFormToPayload(brandData);
  return axiosInstance.put(`/brands?id=${id}`, payload);
};

export const deleteBrand = async (id: number): Promise<void> => {
  return axiosInstance.delete(`/brands?id=${id}`);
};
