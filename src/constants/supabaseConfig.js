/**
 * Configuración de buckets para Supabase Storage
 */
export const SUPABASE_BUCKETS = {
  // Bucket para imágenes y archivos de productos
  PRODUCTS: 'products',
  
  // Bucket para imágenes y archivos de marcas
  BRANDS: 'brands',
  
  // Bucket para imágenes y archivos de radiadores
  RADIATORS: 'radiators',
  
  // Bucket para imágenes y archivos de proveedores
  PROVIDERS: 'providers',
  
  // Bucket para imágenes y archivos de modelos de autos
  CAR_MODELS: 'car-models'
};

/**
 * Configuración de rutas dentro de los buckets
 */
export const SUPABASE_PATHS = {
  // Rutas para el bucket de productos
  PRODUCTS: {
    IMAGES: 'images',
    DOCUMENTS: 'documents'
  },
  
  // Rutas para el bucket de marcas
  BRANDS: {
    IMAGES: 'images',
    LOGOS: 'logos'
  },
  
  // Rutas para el bucket de radiadores
  RADIATORS: {
    IMAGES: 'images',
    TECHNICAL_SHEETS: 'technical-sheets'
  },
  
  // Rutas para el bucket de proveedores
  PROVIDERS: {
    IMAGES: 'images',
    LOGOS: 'logos'
  },
  
  // Rutas para el bucket de modelos de autos
  CAR_MODELS: {
    IMAGES: 'images'
  }
}; 