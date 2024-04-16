import { useState, useEffect } from 'react';
import { FormControl, TextField, Box, Typography, Alert } from '@mui/material';
import { getProvider } from '../../services/ProviderService';

const ProviderForm = ({ setFormCompleted, setFormData, providerId }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [comments, setComments] = useState('');
    const [error, setError] = useState({
        name: false,
        phoneNumber: false,
    });

    useEffect(() => {
        // Verificar si los campos requeridos están completos
        setFormCompleted(name.trim() !== '' && phoneNumber.trim() !== '');
    }, [name, phoneNumber, setFormCompleted]);

    const handlePhoneNumberChange = (event) => {
        const inputValue = event.target.value;
        if (/^\d*$/.test(inputValue)) {
            setPhoneNumber(inputValue);
        }
    };

    const handleBlur = (field) => {
        switch (field) {
            case 'nombre':
                setError((prevError) => ({ ...prevError, name: name.trim() === '' }));
                break;
            case 'telefono':
                setError((prevError) => ({ ...prevError, phoneNumber: phoneNumber.trim() === '' }));
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (providerId) {
                    const provider = await getProvider(providerId);
                    setName(provider.name);
                    setPhoneNumber(provider.phoneNumber);
                    setAddress(provider.address);
                    setComments(provider.comments);
                } else {
                    setFormData({
                        name: name,
                        phoneNumber: phoneNumber,
                        address: address,
                        comments: comments
                    });
                }
            } catch (error) {
                console.error("Error al obtener el proveedor:", error);
            }
        };
    
        fetchData();
    
    }, [name, phoneNumber, address, comments, setFormData, providerId]);
    

    return( 
        <FormControl sx={{ mt: 2, textAlign: 'center', marginLeft: 10, marginRight: 10}}>
            <Box sx={{ mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Información del Proveedor
                </Typography>
            </Box>
            <TextField
                required
                label="Nombre"
                variant="outlined"
                fullWidth   
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => handleBlur('nombre')}
                sx={{ mb: 2 }}
            />
            {error.name && <Alert severity="error">Por favor ingrese el nombre</Alert>}
            <TextField
                required
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onBlur={() => handleBlur('direccion')}
                sx={{ mb: 2 }}
            />
            <TextField
                label="Comentarios"
                multiline
                rows={4}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
            />
        </FormControl>
    );
};

export default ProviderForm;
