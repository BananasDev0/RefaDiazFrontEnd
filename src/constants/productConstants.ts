/**
 * Mapeo de los nombres de tipo de producto de la URL a sus IDs numéricos.
 */
export const RADIATOR_PRODUCT_TYPE_ID = 1;
export const CAP_PRODUCT_TYPE_ID = 2;
export const ACCESSORY_PRODUCT_TYPE_ID = 3;

export const PRODUCT_TYPE_MAP: { [key: string]: string } = {
  radiadores: String(RADIATOR_PRODUCT_TYPE_ID),
  tapas: String(CAP_PRODUCT_TYPE_ID),
  accesorios: String(ACCESSORY_PRODUCT_TYPE_ID),
};

/**
 * Mapeo inverso para construir URLs a partir de IDs (útil para navegación).
 */
export const PRODUCT_TYPE_NAME_MAP: { [key: string]: string } = {
  '1': 'radiadores',
  '2': 'tapas',
  '3': 'accesorios',
};

export const BRAND_TYPE_AUTOMOTIVE = 1;
export const BRAND_TYPE_HEAVY_DUTY = 2;
