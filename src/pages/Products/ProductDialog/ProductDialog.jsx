import React from 'react';
import { Box, CircularProgress, Dialog, Slide } from "@mui/material";
import ProductDialogToolbar from './ProductDialogToolbar';
import { ProductDialogProvider, useProductDialogContext } from './ProductDialogContext';
import ProductFlow from './ProductFlow';
import { useProductsContext } from '../ProductsContext';
import ProductSummary from '../ProductSummary';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ProductDialogContent = () => {
    const { handleCloseDialog, selectedProduct, productType } = useProductsContext();
    const { isLoading, isEditable, product } = useProductDialogContext();
    return (
        <>
            <ProductDialogToolbar handleCloseDialog={handleCloseDialog} />
            {
                isLoading ? (
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
                        {selectedProduct && !isEditable && (
                            <ProductSummary product={product} productType={productType} />
                        )}
                        {
                            !selectedProduct || (selectedProduct && isEditable) && (<ProductFlow></ProductFlow>)
                        }
                    </>
                )
            }
        </>
    );
};

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
                <ProductDialogContent />
            </Dialog>
        </ProductDialogProvider>
    );
};

export default ProductDialog;
