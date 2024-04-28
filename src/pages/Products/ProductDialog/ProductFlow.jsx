import { ProductTypes } from "../ProductsConstants";
import { useProductsContext } from "../ProductsContext";
import { useProductDialogContext } from "./ProductDialogContext";
import RadiatorFlow from "./RadiatorFlow";
import { CircularProgress, Box } from '@mui/material';

const ProductFlow = () => {
    const { isLoading } = useProductDialogContext();
    const { productType } = useProductsContext();

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
                    {productType === ProductTypes.RADIATOR && <RadiatorFlow />}
                </div>
            )}
        </>
    );
}

export default ProductFlow;