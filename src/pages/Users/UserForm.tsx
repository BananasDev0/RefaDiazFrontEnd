// src/pages/Users/UserForm.tsx

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button, Box, Grid, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
// --- INICIO NUEVOS IMPORTS ---
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
// --- FIN NUEVOS IMPORTS ---
import { userSchema, editUserSchema } from './userSchema';
import { RoleName } from '../../types/user.types';
import type { User } from '../../types/user.types';

// Actualizamos la interfaz para incluir los nuevos campos
export interface UserFormData {
  name: string;
  lastName: string;
  email: string;
  role: RoleName;
  password?: string;
  confirmPassword?: string;
  phoneNumber?: string; // Nuevo
  address?: string;     // Nuevo
  birthDate?: Date | null; // Nuevo
}

interface UserFormProps {
  onSubmit: (data: Partial<UserFormData>) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  user?: User | null;
  viewMode?: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({ onSubmit, onCancel, isSubmitting, user = null, viewMode = false }) => {
  const isEditMode = !!user;
  const readOnly = viewMode;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: yupResolver(isEditMode ? editUserSchema : userSchema),
    // Agregamos los valores por defecto para los nuevos campos
    defaultValues: {
      name: user?.person?.name || '',
      lastName: user?.person?.lastName || '',
      email: user?.person?.email || '',
      role: user?.role?.description || RoleName.EMPLOYEE,
      password: '',
      confirmPassword: '',
      phoneNumber: user?.person?.phoneNumber || '',
      address: user?.person?.address || '',
      birthDate: user?.person?.birthDate ? dayjs(user.person.birthDate).toDate() : null,
    },
  });

  useEffect(() => {
    // Actualizamos el reset para incluir los nuevos campos
    reset({
      name: user?.person?.name || '',
      lastName: user?.person?.lastName || '',
      email: user?.person?.email || '',
      role: user?.role?.description || RoleName.EMPLOYEE,
      phoneNumber: user?.person?.phoneNumber || '',
      address: user?.person?.address || '',
      birthDate: user?.person?.birthDate ? dayjs(user.person.birthDate).toDate() : null,
    });
  }, [user, reset]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2}>
          {/* Nombre y Apellido (sin cambios) */}
          <Grid size={6}>
            <Controller name="name" control={control} render={({ field }) => <TextField {...field} label="Nombre(s)" fullWidth required error={!!errors.name} helperText={errors.name?.message} InputProps={{ readOnly }} />} />
          </Grid>
          <Grid size={6}>
            <Controller name="lastName" control={control} render={({ field }) => <TextField {...field} label="Apellido(s)" fullWidth error={!!errors.lastName} helperText={errors.lastName?.message} InputProps={{ readOnly }} />} />
          </Grid>

          {/* Correo (sin cambios) */}
          <Grid size={12}>
            <Controller name="email" control={control} render={({ field }) => ( <TextField {...field} label="Correo Electrónico" type="email" fullWidth required error={!!errors.email} helperText={errors.email?.message} InputProps={{ readOnly: isEditMode || viewMode }} /> )} />
          </Grid>

          {/* --- INICIO NUEVOS CAMPOS --- */}
          <Grid size={6}>
            <Controller name="phoneNumber" control={control} render={({ field }) => ( <TextField {...field} label="Teléfono" fullWidth error={!!errors.phoneNumber} helperText={errors.phoneNumber?.message} InputProps={{ readOnly }} /> )} />
          </Grid>
          <Grid size={6}>
            <Controller name="birthDate" control={control} render={({ field }) => ( <DatePicker label="Fecha de Nacimiento" value={field.value ? dayjs(field.value) : null} onChange={(date) => field.onChange(date ? date.toDate() : null)} sx={{ width: '100%' }} readOnly={readOnly} /> )} />
          </Grid>
          <Grid size={12}>
            <Controller name="address" control={control} render={({ field }) => ( <TextField {...field} label="Dirección" fullWidth multiline rows={2} error={!!errors.address} helperText={errors.address?.message} InputProps={{ readOnly }} /> )} />
          </Grid>
          {/* --- FIN NUEVOS CAMPOS --- */}
          
          {/* Rol (sin cambios) */}
          <Grid size={12}>
            <FormControl fullWidth required error={!!errors.role}>
              <InputLabel id="role-label">Rol</InputLabel>
              <Controller name="role" control={control} render={({ field }) => (
                <Select {...field} labelId="role-label" label="Rol" readOnly={readOnly}>
                  {Object.values(RoleName).map((role) => ( <MenuItem key={role} value={role}>{role}</MenuItem> ))}
                </Select>
              )} />
              {errors.role && <FormHelperText>{errors.role?.message}</FormHelperText>}
            </FormControl>
          </Grid>
          
          {/* Contraseñas (sin cambios) */}
          {!isEditMode && (
            <>
              <Grid size={6}>
                <Controller name="password" control={control} render={({ field }) => <TextField {...field} label="Contraseña" type="password" fullWidth required error={!!errors.password} helperText={errors.password?.message} />} />
              </Grid>
              <Grid size={6}>
                <Controller name="confirmPassword" control={control} render={({ field }) => <TextField {...field} label="Confirmar Contraseña" type="password" fullWidth required error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message} />} />
              </Grid>
            </>
          )}
        </Grid>

        {/* Botones (sin cambios) */}
        {!readOnly && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button onClick={onCancel} sx={{ mr: 1 }}>Cancelar</Button>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </Box>
        )}
      </form>
    </LocalizationProvider>
  );
};