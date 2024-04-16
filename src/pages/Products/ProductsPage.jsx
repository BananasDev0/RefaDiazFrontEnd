import { Box, Fab, Tab, Tabs } from "@mui/material";
import { useMobile } from "../../components/MobileProvider";
import ProductSelector from "./ProductSelector";
import ProductDialog from "./ProductDialog/ProductDialog";
import AddIcon from "@mui/icons-material/Add";
import { ProductsProvider, useProductsContext } from "./ProductsContext";

function ProductsPresentation() {
  const { productType, handleChangeProductType, openDialog, handleOpenDialog, handleCloseDialog } = useProductsContext();
  const responsive = useMobile();

  const handleChange = (event, newValue) => {
    handleChangeProductType(newValue);
  };

  return (
    <Box sx={{ width: '100%', '& > *:not(style)': { mb: 3 } }}>
      <Tabs
        value={productType}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="product tabs"
        sx={{ width: responsive.isMobile ? '85vw' : '100%' }}
      >
        <Tab value="radiadores" label="Radiadores" />
        <Tab value="tapas" label="Tapas" />
        <Tab value="abanicos" label="Abanicos" />
      </Tabs>

      <ProductSelector productType={productType} />

      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        onClick={handleOpenDialog}
      >
        <AddIcon />
      </Fab>

      <ProductDialog open={openDialog} onClose={handleCloseDialog} initialType={productType} />
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
