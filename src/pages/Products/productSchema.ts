import * as yup from 'yup';

export const productSchema = yup.object({
  name: yup.string().required('El nombre del producto es requerido.'),
  dpi: yup.string().required('El DPI o identificador es requerido.'),
  stockCount: yup
    .number()
    .typeError('El stock debe ser un número.')
    .min(0, 'El stock no puede ser negativo.')
    .integer('El stock debe ser un número entero.')
    .required('La cantidad de stock es requerida.'),
  comments: yup.string().optional(),
  // Los arrays se añadirán en pasos posteriores
  files: yup.array().of(yup.mixed()).optional(), // yup.mixed() para File/Blob
  productCarModels: yup.array().of(yup.object({})).optional(),
  productProviders: yup.array().of(yup.object({})).optional(),
  productPrices: yup.array().of(yup.object({})).optional(),
});
