import { useState } from 'react';
import { FormControl, TextField, Box, Typography, Alert } from '@mui/material';

const ProviderForm = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [error, setError] = useState({
        nombre: false,
        telefono: false,
    });

    const handlePhoneNumberChange = (event) => {
        const inputValue = event.target.value;
        if (/^\d*$/.test(inputValue)) {
            setPhoneNumber(inputValue);
        }
    };

    const handleBlur = (field) => {
        switch (field) {
            case 'nombre':
                setError((prevError) => ({ ...prevError, nombre: nombre.trim() === '' }));
                setTimeout(() => setError((prevError) => ({ ...prevError, nombre: false })), 1000);
                break;
            case 'telefono':
                setError((prevError) => ({ ...prevError, telefono: phoneNumber.trim() === '' }));
                setTimeout(() => setError((prevError) => ({ ...prevError, telefono: false })), 1000);
                break;
            default:
                break;
        }
    };

    return( 
        <FormControl sx={{ mt: 2, textAlign: 'center', marginLeft: 10, marginRight: 10}}>
            <Box sx={{ mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Información del Proveedor
                </Typography>
            </Box>
            <TextField
                label="Nombre"
                variant="outlined"
                fullWidth
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                onBlur={() => handleBlur('nombre')}
                sx={{ mb: 2 }}
            />
            {error.nombre && <Alert severity="error">Por favor ingrese el nombre</Alert>}
            <TextField
                label="Número Telefónico"
                variant="outlined"
                fullWidth
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                onBlur={() => handleBlur('telefono')}
                inputProps={{
                    maxLength: 10, // Limita la longitud del número de teléfono a 10 dígitos
                    inputMode: 'numeric', // Muestra un teclado numérico en dispositivos móviles
                }}
                sx={{ mb: 2 }}
            />
            {error.telefono && <Alert severity="error">Por favor ingrese el número de teléfono</Alert>}
            <TextField
                label="Dirección"
                variant="outlined"
                fullWidth
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                onBlur={() => handleBlur('direccion')}
                sx={{ mb: 2 }}
            />
            <TextField
                label="Comentarios"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
            />
        </FormControl>
    );
};

export default ProviderForm;