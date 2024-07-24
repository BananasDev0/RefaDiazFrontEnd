import { Box, Fab } from "@mui/material";
import ProductSelector from "./ProductSelector";
import ProductDialog from "./ProductDialog/ProductDialog";
import AddIcon from "@mui/icons-material/Add";
import { ProductsProvider, useProductsContext } from "./ProductsContext";

function ProductsPresentation() {
  const { handleOpenDialog } = useProductsContext();

  return (
    <Box sx={{ width: '100%', '& > *:not(style)': { mb: 3 } }}>
      <ProductSelector />
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
}

export default function ProductsPage() {
  return (
    <ProductsProvider>
      <ProductsPresentation />
    </ProductsProvider>
  )
}
