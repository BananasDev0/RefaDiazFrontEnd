import { useState, forwardRef } from 'react';
import { Dialog, Button, AppBar, Toolbar, IconButton, Typography, Slide, Snackbar, Alert } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ProviderForm from './ProviderForm';
// import { createProvider } from '../../services/ProviderService';
// import Provider from '../../models/Provider';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const ProviderDialog = ({ open, onClose, addProviderToList, updateProviderInfo, providerId }) => {
    const [formCompleted, setFormCompleted] = useState(false);
    const [formData, setFormData] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSave = async (formData) => {
        try {
            if (providerId) {
                // Si hay un providerId existente, llama a la función para actualizar la información del proveedor
                await updateProviderInfo(providerId, formData);
                setSnackbarOpen(true);
            } else {
                // Si no hay un providerId existente, llama a la función para agregar un nuevo proveedor
                await addProviderToList(formData);
            }
        } catch (error) {
            console.error("Error al guardar proveedor:", error);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };
    
    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            aria-labelledby="dialog-title"
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={onClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Agregar Proveedor
                    </Typography>

                    <Button autoFocus color="inherit" onClick={() => handleSave(formData)} disabled={!formCompleted}>
                        Guardar
                    </Button>

                </Toolbar>
            </AppBar>

            <ProviderForm setFormCompleted={setFormCompleted} setFormData={setFormData} providerId={providerId}/>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success">
                    ¡Proveedor guardado con éxito!
                </Alert>
            </Snackbar>
        </Dialog>
    );
};

export default ProviderDialog;
