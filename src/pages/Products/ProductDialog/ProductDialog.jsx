import React from 'react';
import { Dialog, Slide } from "@mui/material";
import RadiatorFlow from './RadiatorFlow';
import ProductDialogToolbar from './ProductDialogToolbar';
import { ProductDialogProvider } from './ProductDialogContext';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const ProductDialog = ({ open, onClose }) => {
    return (
        <ProductDialogProvider>
            <Dialog
                fullScreen
                open={open}
                onClose={onClose}
                aria-labelledby="dialog-title"
                TransitionComponent={Transition}
            >
                <ProductDialogToolbar handleCloseDialog={onClose} />
                <RadiatorFlow></RadiatorFlow>
            </Dialog>
        </ProductDialogProvider>
    );
};

export default ProductDialog;
