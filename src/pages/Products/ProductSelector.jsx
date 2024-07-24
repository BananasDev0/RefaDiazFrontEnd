import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import BrandContainer from './BrandViewer/BrandContainer';
import ProductSelectorNav from './ProductSelectorNav';
import CustomSearchBar from '../../components/CustomSearchBar';
import { useProductsContext } from './ProductsContext';
import { Screens } from './ProductsConstants';
import ProductContainer from './ProductViewer/ProductContainer';
import CarModelListContainer from './ModelViewer/CarModelContainer';
import ProductTypeSelector from './ProductTypeSelector';

const ProductSelector = () => {
    const { currentScreen, loading, productType } = useProductsContext();

    if (!productType) {
        return <ProductTypeSelector />;
    }

    const renderContent = () => {
        switch (currentScreen) {
            case Screens.BRANDS:
                return <BrandContainer />;
            case Screens.MODELS:
                return <CarModelListContainer />;
            case Screens.PRODUCTS:
                return <ProductContainer />;
            default:
                return null;
        }
    };

    return (
        <Box>
            <ProductSelectorNav />
            <CustomSearchBar />

            <Box sx={{ height: 'calc(100vh - 320px)', overflowY: 'auto' }}>
                {renderContent()}
                {loading && (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                        <CircularProgress size={40} />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default ProductSelector;