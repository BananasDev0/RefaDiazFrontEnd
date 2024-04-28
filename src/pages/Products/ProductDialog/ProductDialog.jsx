import React from 'react';
import { Dialog, Slide } from "@mui/material";
import ProductDialogToolbar from './ProductDialogToolbar';
import { ProductDialogProvider } from './ProductDialogContext';
import ProductFlow from './ProductFlow';
import { useProductsContext } from '../ProductsContext';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const ProductDialog = () => {
    const { openDialog, handleCloseDialog } = useProductsContext();
    return (
        <ProductDialogProvider>
            <Dialog
                fullScreen
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="dialog-title"
                TransitionComponent={Transition}
            >
                <ProductDialogToolbar handleCloseDialog={handleCloseDialog} />
                <ProductFlow></ProductFlow>
            </Dialog>
        </ProductDialogProvider>
    );
};

export default ProductDialog;
