import * as yup from 'yup';

export const capDialogSchema = yup.object({
  name: yup.string().required('El nombre del producto es requerido.'),
  dpi: yup.string().required('El DPI o identificador es requerido.'),
  comments: yup.string().optional().default(''),
  files: yup.array().of(yup.mixed()).optional().default([]),
  productProviders: yup.array().of(yup.object({})).optional().default([]),
});
