// src/pages/Products/ProductDialog/ProductDialog.jsx
import React, { memo } from 'react';
import { Box, CircularProgress, Dialog, Slide } from '@mui/material';
import ProductDialogToolbar from './ProductDialogToolbar';
import { useProductDialogContext } from '../ProductDialogContext';
import { useProductSelectionContext } from '../ProductSelectionContext';
import { useProductLoadingContext } from '../ProductLoadingContext';
import ProductSummary from '../ProductSummary';
import RadiatorFlow from './RadiatorFlow';
import { ProductTypes } from '../ProductsConstants';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const renderProductFlow = (productType) => {
    switch (productType) {
        case ProductTypes.RADIATOR:
            return <RadiatorFlow />;
        default:
            return null;
    }
};

const ProductDialogContent = memo(() => {
    const { closeDialog, mode, productId } = useProductDialogContext();
    const { productType } = useProductSelectionContext();
    const { loading: isLoading } = useProductLoadingContext();
    console.log(mode)

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
                    {mode === 'view' && (
                        <ProductSummary productId={productId} productType={productType} />
                    )}
                    {(mode === 'create' || mode === 'edit') && renderProductFlow(productType)}
                </>
            )}
        </>
    );
});
ProductDialogContent.displayName = 'ProductDialogContent';

const ProductDialog = memo(() => {
    const { isOpen, closeDialog } = useProductDialogContext();
    
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
});
ProductDialog.displayName = 'ProductDialog';

export default ProductDialog;