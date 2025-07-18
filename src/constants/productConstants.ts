/**
 * Mapeo de los nombres de tipo de producto de la URL a sus IDs numéricos.
 */
export const PRODUCT_TYPE_MAP: { [key: string]: string } = {
  radiadores: '1',
  tapas: '2',
  accesorios: '3',
};

/**
 * Mapeo inverso para construir URLs a partir de IDs (útil para navegación).
 */
export const PRODUCT_TYPE_NAME_MAP: { [key: string]: string } = {
  '1': 'radiadores',
  '2': 'tapas',
  '3': 'accesorios',
};
