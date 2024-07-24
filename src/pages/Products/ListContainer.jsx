import { Box, CircularProgress, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CustomSearchBar from '../../components/CustomSearchBar';
import { useProductsContext } from './ProductsContext';
import ProductDialog from './ProductDialog/ProductDialog';

const ListContainer = ({ children }) => {
  const { loading, handleOpenDialog } = useProductsContext();

  return (
    <Box sx={{ width: '100%', '& > *:not(style)': { mb: 3 } }}>
      <CustomSearchBar />
      
      <Box sx={{ flexGrow: 1, overflow: 'auto', mt: 2 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress size={40} />
          </Box>
        ) : (
          <Box sx={{ height: 'calc(100vh - 290px)', overflowY: 'auto' }}>{children}</Box> 
          
        )}
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
  );
};

export default ListContainer;