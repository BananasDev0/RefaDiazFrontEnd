import { useState, forwardRef } from 'react';
import { Dialog, Button, AppBar, Toolbar, IconButton, Typography, Slide } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ProviderForm from './ProviderForm';
import { createProvider } from '../../services/ProviderService';
import Provider from '../../models/Provider';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const ProviderDialog = ({ open, onClose }) => {
    const [formCompleted, setFormCompleted] = useState(false);

    const [formData, setFormData] = useState({});

    const handleSave = async (formData) => {
        try {
            const provider = new Provider(
                {
                    name: formData.name,
                    phoneNumber: formData.phoneNumber,
                    address: formData.address,
                    comments: formData.comments
                })

            await createProvider(provider)
            onClose(); // Cierra el diálogo
        } catch (error) {
            console.log(error);
        }

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

            <ProviderForm setFormCompleted={setFormCompleted} setFormData={setFormData} />

        </Dialog>
    );
};

export default ProviderDialog;
