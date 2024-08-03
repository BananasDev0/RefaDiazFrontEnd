import { Outlet } from 'react-router-dom';
import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ProductDialog from './ProductDialog/ProductDialog';
import CustomSearchBar from '../../components/CustomSearchBar';
import { useProductsContext } from './ProductsContext';

const SearchWrapper = () => {
    const { handleOpenDialog } = useProductsContext();

    return (
        <Box>
            <Box sx={{ width: '100%', '& > *:not(style)': { mb: 3 } }}>
                <CustomSearchBar />
                <Box sx={{ flexGrow: 1, overflow: 'auto', mt: 2 }}>
                    <Box sx={{ height: 'calc(100vh - 290px)', overflowY: 'auto' }}>
                        <Outlet />
                    </Box>
                </Box>
                <Fab
                    color="primary"
                    aria-label="add"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    onClick={handleOpenDialog}
                >
                    <AddIcon />
                </Fab>
                <ProductDialog />
            </Box>
        </Box>
    );
};

export default SearchWrapper;