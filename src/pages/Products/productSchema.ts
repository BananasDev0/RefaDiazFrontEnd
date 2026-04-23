import * as yup from 'yup';

const baseProductSchema = yup.object({
  name: yup.string().required('El nombre del producto es requerido.'),
  dpi: yup.string().optional(),
  stockCount: yup
    .number()
    .typeError('El stock debe ser un número.')
    .min(0, 'El stock no puede ser negativo.')
    .integer('El stock debe ser un número entero.')
    .optional(),
  productCategoryId: yup.number().nullable().optional().default(null),
  comments: yup.string().optional().default(undefined),
  files: yup.array().of(yup.mixed()).optional().default([]),
  productCarModels: yup.array().of(yup.object({})).optional().default([]),
  productProviders: yup.array().of(yup.object({})).optional().default([]),
  productPrices: yup.array().of(yup.object({})).optional().default([]),
  components: yup.array().of(yup.object({})).optional().default([]),
  componentsTouched: yup.boolean().optional().default(false),
});

const radiatorProductSchema = baseProductSchema.shape({
  stockCount: yup
    .number()
    .typeError('El stock debe ser un número.')
    .min(0, 'El stock no puede ser negativo.')
    .integer('El stock debe ser un número entero.')
    .required('La cantidad de stock es requerida.'),
});

const accessoryProductSchema = baseProductSchema.shape({
  dpi: yup.string().optional().default(''),
  stockCount: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' || originalValue === null ? 0 : value))
    .optional()
    .default(0),
});

export const getProductSchema = (productType?: string) => {
  if (productType === 'accesorios') {
    return accessoryProductSchema;
  }

  return radiatorProductSchema;
};

export const productSchema = radiatorProductSchema;
