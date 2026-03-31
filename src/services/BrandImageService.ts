import { supabase } from './supabaseClient';
import type { BrandFilePayload } from '../types/brand.types';

const BUCKET_NAME = 'brands';

const slugify = (value: string) => (
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
);

export const BrandImageService = {
  async uploadLogo(file: globalThis.File, brandName: string): Promise<BrandFilePayload> {
    const fileExtension = file.name.split('.').pop() || 'png';
    const brandSlug = slugify(brandName) || 'brand-logo';
    const filePath = `logos/${brandSlug}.${fileExtension}`;

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, { upsert: true });

    if (error) {
      throw new Error(`Error al subir el logo de la marca: ${error.message}`);
    }

    return {
      name: `${brandName} Logo`,
      mimeType: file.type,
      storagePath: `${BUCKET_NAME}/${filePath}`,
    };
  },
};
