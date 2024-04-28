import { Box, Fab } from "@mui/material";
import ProductSelector from "./ProductSelector";
import ProductDialog from "./ProductDialog/ProductDialog";
import AddIcon from "@mui/icons-material/Add";
import { ProductsProvider, useProductsContext } from "./ProductsContext";
import { ProductTypeTabs } from "./ProductTypeTabs";

function ProductsPresentation() {
  const { productType, openDialog, handleOpenDialog, handleCloseDialog } = useProductsContext();
  const { selectedProduct } = useProductsContext();

  return (
    <Box sx={{ width: '100%', '& > *:not(style)': { mb: 3 } }}>
      <ProductTypeTabs />
      <ProductSelector />
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        onClick={handleOpenDialog}
      >
        <AddIcon />
      </Fab>

      <ProductDialog open={openDialog} onClose={handleCloseDialog} initialType={productType} selectedProduct={selectedProduct} />
    </Box>
  );
}

export default function ProductsPage() {
  return (
    <ProductsProvider>
      <ProductsPresentation />
    </ProductsProvider>
  )
}
