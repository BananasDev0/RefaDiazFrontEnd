// src/pages/Products/ProductViewer/ProductContainer.jsx
import { useEffect, useState } from 'react';
import { getImageURLFromStorage } from '../../../services/Firebase/storage';
import '../../../styles/brandContainer.css';
import { useSnackbar } from '../../../components/SnackbarContext';
import { getAllCarModelsProducts } from '../../../services/CarModelService';
import { useProductSelectionContext } from '../ProductSelectionContext';
import { useProductSearchContext } from '../ProductSearchContext';
import { useProductLoadingContext } from '../ProductLoadingContext';
import { Screens, SearchOptions } from '../ProductsConstants';
import ProductList from './ProductList';
import { ProductCarModel } from '../../../models/ProductCarModel';
import { deleteProduct } from '../../../services/ProductService';
import { Box, CircularProgress } from '@mui/material';

const ProductContainer = () => {
  const [productCarModels, setProductCarModels] = useState([]);
  const { openSnackbar } = useSnackbar();
  const { setSelectedProduct } = useProductSelectionContext();
  const { searchTerm, searchOption } = useProductSearchContext();
  const { setLoading, loading } = useProductLoadingContext();

  const handleProductSelect = (e, item) => {
    const productCarModel = productCarModels.find(pcm => pcm.product.id === item.id);
    setSelectedProduct(productCarModel.product, Screens.PRODUCTS);
  };

  const handleOnDelete = async (productCarModel) => {
    try {
      let result = await deleteProduct(productCarModel.product.id);
      if (result) {
        const products = productCarModels.filter(pcm => pcm.product.id !== productCarModel.product.id);
        setProductCarModels(products);
        openSnackbar('Producto eliminado correctamente', 'success');
      } else {
        openSnackbar('Error al eliminar el producto', 'error');
      }
    } catch (error) {
      openSnackbar(`Error al eliminar el producto: ${error.errorMessage}`, 'error');
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        setProductCarModels([]);
        let response = null;
        let productCarModelsData = [];
        // Aquí asumes que searchOption está vinculado al tipo de producto, pero podrías ajustar según tu lógica
        if (searchOption === SearchOptions.PRODUCTS) {
          response = await getAllCarModelsProducts(searchOption, searchTerm); // Ajusta según tu API
          productCarModelsData = response.data;
        }
        productCarModelsData = productCarModelsData.map(productCarModel => new ProductCarModel(productCarModel));
        const productsWithImages = await Promise.all(productCarModelsData.map(async (productCarModel) => {
          let file = productCarModel.product.files.find(file => file.orderId === 1);
          if (file) {
            const imageUrl = await getImageURLFromStorage(file.storagePath).catch(error => {
              console.error('Error al obtener url imagen de storage para producto:', productCarModel.product.name, error);
              return '';
            });
            return { ...productCarModel, imageUrl };
          }
          return productCarModel;
        }));
        setProductCarModels(productsWithImages);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        setLoading(false);
        openSnackbar(`Error al cargar los productos: ${error.errorMessage}`, 'error');
      }
    };
    fetchProducts();
  }, [searchTerm, searchOption, setLoading, openSnackbar]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress size={40} />
      </Box>
    );
  }

  return (
    <ProductList products={productCarModels} onProductSelect={handleProductSelect} handleOnDelete={handleOnDelete} />
  );
};

export default ProductContainer;