import React, { useState } from 'react';
import { Dialog, Button, AppBar, Toolbar, IconButton, Typography, Slide } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import RadiatorFlow from './RadiatorFlow';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ProductDialog = ({ open, onClose }) => {
    const [productType, setProductType] = useState('');

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
                    <Button autoFocus color="inherit" onClick={() => {
                        onClose();
                        console.log(productType);
                    }}>
                        Guardar
                    </Button>
                </Toolbar>
            </AppBar>
            <RadiatorFlow onProductTypeChange={setProductType} productTypeValue={productType} index={0}/>
        </Dialog>
    );
};

export default ProductDialog;
