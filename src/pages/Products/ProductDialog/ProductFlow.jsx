import ProductSummary from "../ProductSummary";
import { useProductsContext } from "../ProductsContext";
import { useProductDialogContext } from "./ProductDialogContext";
import RadiatorFlow from "./RadiatorFlow";
import { CircularProgress, Box } from '@mui/material';

const ProductFlow = () => {
    const { isLoading } = useProductDialogContext();
    const { productType, selectedProduct } = useProductsContext();

    return (
        <>
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
                <div>
                    {productType === 'radiadores' && <RadiatorFlow />}
                </div>
            )}
        </>
    );
}

export default ProductFlow;