import * as yup from 'yup';

export const vehicleNoteSchema = yup.object({
  title: yup.string().trim().required('El titulo es requerido.'),
  contentMarkdown: yup.string().trim().required('El contenido es requerido.'),
  brandId: yup.number().nullable().optional().default(null),
  carModelId: yup.number().nullable().optional().default(null),
  files: yup.array().of(yup.mixed()).optional().default([]),
});
