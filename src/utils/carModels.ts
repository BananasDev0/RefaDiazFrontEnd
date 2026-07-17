import type { Product, ProductCarModel } from '../types/product.types';

/**
 * Combina las compatibilidades directas y transitivas de un producto,
 * eliminando duplicados por modelo + rango de años.
 */
export const getCompatibleCarModels = (product: Product): ProductCarModel[] => {
  const combinedModels = [...(product.productCarModels || []), ...(product.transitiveProductCarModels || [])];
  const seen = new Set<string>();

  return combinedModels.filter((carModel) => {
    const key = `${carModel.carModelId}-${carModel.initialYear ?? ''}-${carModel.lastYear ?? ''}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
};

/**
 * Etiqueta legible "Marca Modelo (añoInicial-añoFinal)" de una compatibilidad.
 * Omite los años cuando el rango no está definido.
 */
export const getCarModelLabel = (carModel: ProductCarModel): string => {
  const brandName = carModel.carModel?.brand?.name || '';
  const modelName = carModel.carModel?.name || '';
  const { initialYear, lastYear } = carModel;

  if (initialYear && lastYear) {
    return `${brandName} ${modelName} (${initialYear}-${lastYear})`.trim();
  }

  return `${brandName} ${modelName}`.trim();
};
