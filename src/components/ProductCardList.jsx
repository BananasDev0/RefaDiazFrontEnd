import Grid from '@mui/material/Grid';
import { ProductCard } from './ProductCard';
import { Typography, Box } from '@mui/material';

const ProductCardList = ({ products, onProductSelect, menuOptions = [] }) => {
    if (products.length === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <Typography variant="h6" color="text.secondary">
                    No hay productos disponibles en este momento.
                </Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={2}>
            {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                    <ProductCard 
                        product={product} 
                        onClick={onProductSelect}
                        menuOptions={menuOptions}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductCardList; 