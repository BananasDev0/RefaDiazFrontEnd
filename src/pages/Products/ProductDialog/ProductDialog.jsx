import React, { useState } from 'react';
import { Dialog, Button, AppBar, Toolbar, IconButton, Typography, Slide } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import RadiatorFlow from './RadiatorFlow';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const totalSteps = 3; // Asumiendo 3 pasos para el ejemplo

const ProductDialog = ({ open, onClose }) => {
    const [productType, setProductType] = useState('');
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
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
                        Agregar Producto
                    </Typography>
                    {activeStep > 0 && (
                        <Button color="inherit" onClick={handleBack}>
                            Atrás
                        </Button>
                    )}
                    {activeStep < totalSteps - 1 ? (
                        <Button autoFocus color="inherit" onClick={handleNext}>
                            Siguiente
                        </Button>
                    ) : (
                        <Button autoFocus color="inherit" onClick={() => {
                            onClose(); // Posiblemente quieras manejar la lógica de guardar antes de cerrar
                            console.log(productType);
                        }}>
                            Guardar
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            <RadiatorFlow onProductTypeChange={setProductType} productTypeValue={productType} index={activeStep}/>
        </Dialog>
    );
};

export default ProductDialog;
