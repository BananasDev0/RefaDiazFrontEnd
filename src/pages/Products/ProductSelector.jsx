import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import BrandContainer from './BrandViewer/BrandContainer';
import ProductSelectorNav from './ProductSelectorNav';
import CustomSearchBar from '../../components/CustomSearchBar';
import { useProductsContext } from './ProductsContext';
import { Screens } from './ProductsConstants';
import ProductContainer from './ProductViewer/ProductContainer';
import CarModelListContainer from './ModelViewer/CarModelContainer';

const ProductSelector = () => {
    const { currentScreen, loading } = useProductsContext();

    return (
        <>
            <ProductSelectorNav />
            <CustomSearchBar />

            <Box sx={{ height: 'calc(100vh - 320px)', overflowY: 'auto' }}>
                {currentScreen === Screens.BRANDS && <BrandContainer />}
                {currentScreen === Screens.MODELS && <CarModelListContainer />}
                {currentScreen === Screens.PRODUCTS && <ProductContainer />}

                {loading && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                        <CircularProgress size={40} />
                    </div>
                )}
            </Box>
        </>
    );
};

export default ProductSelector;
