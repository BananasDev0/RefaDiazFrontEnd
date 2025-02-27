// src/pages/Products/ProductDialog/ProductDialog.jsx
import React from 'react';
import { Box, CircularProgress, Dialog, Slide } from '@mui/material';
import ProductDialogToolbar from './ProductDialogToolbar';
import { useDialogContext } from '../DialogContext';
import ProductFlow from './ProductFlow';
import { useSelectionContext } from '../SelectionContext'; // Usamos el nuevo contexto
import { useLoadingContext } from '../LoadingContext';
import ProductSummary from '../ProductSummary';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ProductDialogContent = () => {
    const { closeDialog, selectedProduct, product } = useDialogContext();
    const { productType } = useSelectionContext(); // Obtener el tipo de producto
    const { loading: isLoading } = useLoadingContext(); // Usar el estado de carga

    return (
        <>
            <ProductDialogToolbar handleCloseDialog={closeDialog} />
            {isLoading ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {selectedProduct && !product.isEditable && ( // Asumimos que 'isEditable' se maneja en ProductDialogContext
                        <ProductSummary product={product} productType={productType} />
                    )}
                    {!selectedProduct || (selectedProduct && product.isEditable) ? <ProductFlow /> : null}
                </>
            )}
        </>
    );
};

const ProductDialog = () => {
    const { isOpen, closeDialog } = useDialogContext();
    console.log(isOpen)
    return (
        <Dialog
            fullScreen
            open={isOpen}
            onClose={closeDialog}
            aria-labelledby="dialog-title"
            TransitionComponent={Transition}
        >
            <ProductDialogContent />
        </Dialog>
    );
};

export default ProductDialog;