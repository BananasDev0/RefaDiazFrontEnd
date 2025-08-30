import * as yup from 'yup';

export const providerSchema = yup.object().shape({
  name: yup
    .string()
    .required('El nombre del proveedor es obligatorio.')
    .min(3, 'El nombre debe tener al menos 3 caracteres.'),
  phoneNumber: yup
    .string()
    .required('El número de teléfono es obligatorio.')
    .matches(/^[0-9\s-()]*$/, 'El formato del teléfono no es válido.')
    .min(8, 'El teléfono debe tener al menos 8 dígitos.'),
  address: yup
    .string()
    .required('La dirección es obligatoria.'),
  comments: yup
    .string()
    .optional(),
});
