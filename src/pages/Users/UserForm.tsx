import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button, Box, Grid, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { userSchema, editUserSchema } from './userSchema'; // Import both schemas
import { RoleName } from '../../types/user.types';
import type { User } from '../../types/user.types';


// This type represents the shape of our form data
export interface UserFormData {
  name: string;
  lastName: string;
  email: string;
  role: RoleName;
  password?: string;
  confirmPassword?: string;
}

interface UserFormProps {
  onSubmit: (data: Partial<UserFormData>) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  user?: User | null; // Make user optional for create mode
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
    // Use the appropriate schema based on the mode
    resolver: yupResolver(isEditMode ? editUserSchema : userSchema),
    defaultValues: {
      name: user?.person?.name || '',
      lastName: user?.person?.lastName || '',
      email: user?.person?.email || '',
      role: user?.role?.description || RoleName.EMPLOYEE,
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    reset({
      name: user?.person?.name || '',
      lastName: user?.person?.lastName || '',
      email: user?.person?.email || '',
      role: user?.role?.description || RoleName.EMPLOYEE,
    });
  }, [user, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={2}>
        {/* Fields are the same, but password is only shown for create mode */}
        <Grid size={6}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <TextField {...field} label="Nombre(s)" fullWidth required error={!!errors.name} helperText={errors.name?.message} InputProps={{ readOnly }} />}
          />
        </Grid>
        <Grid size={6}>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => <TextField {...field} label="Apellido(s)" fullWidth error={!!errors.lastName} helperText={errors.lastName?.message} InputProps={{ readOnly }} />}
          />
        </Grid>
        <Grid size={12}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField 
                {...field} 
                label="Correo Electrónico" 
                type="email" 
                fullWidth 
                required 
                error={!!errors.email} 
                helperText={errors.email?.message}
                // Añadimos la propiedad InputProps para hacerlo de solo lectura en modo edición
                InputProps={{ readOnly: isEditMode || viewMode }} 
              />
            )}
          />
        </Grid>
        {/* Role is not editable in this form */}
        <Grid size={12}>
          <FormControl fullWidth required error={!!errors.role}>
            <InputLabel id="role-label">Rol</InputLabel>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="role-label"
                  label="Rol"
                  readOnly={readOnly}
                >
                  {Object.values(RoleName).map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.role && <FormHelperText>{errors.role?.message}</FormHelperText>}
          </FormControl>
        </Grid>

        {!isEditMode && (
          <>
            <Grid size={6}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => <TextField {...field} label="Contraseña" type="password" fullWidth required error={!!errors.password} helperText={errors.password?.message} />}
              />
            </Grid>
            <Grid size={6}>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => <TextField {...field} label="Confirmar Contraseña" type="password" fullWidth required error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message} />}
              />
            </Grid>
          </>
        )}
      </Grid>
      {!readOnly && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button onClick={onCancel} sx={{ mr: 1 }}>Cancelar</Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </Box>
      )}
    </form>
  );
};
