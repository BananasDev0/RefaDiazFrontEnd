import * as yup from 'yup';

export const userSchema = yup.object().shape({
  name: yup.string().required('El nombre es requerido'),
  lastName: yup.string().optional(),
  email: yup.string().email('Debe ser un correo válido').required('El correo es requerido'),
  password: yup.string().min(8, 'La contraseña debe tener al menos 8 caracteres').required('La contraseña es requerida'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir')
    .required('Confirma la contraseña'),
  role: yup.string().required('El rol es requerido'),
  phoneNumber: yup.string().optional(),
  address: yup.string().optional(),
  birthDate: yup.date().optional().nullable(),
});

export const editUserSchema = yup.object().shape({
  name: yup.string().required('El nombre es requerido'),
  lastName: yup.string().optional(),
  email: yup.string().email('Debe ser un correo válido').required('El correo es requerido'),
  role: yup.string().required('El rol es requerido'),
  phoneNumber: yup.string().optional(),
  address: yup.string().optional(),
  birthDate: yup.date().optional().nullable(),
});