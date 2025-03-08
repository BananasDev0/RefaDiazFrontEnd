import { useEffect, useState } from 'react';
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
import { useProductDialogContext } from '../ProductDialogContext';
import { StorageAdapter } from '../../../services/StorageAdapter';

const ProductContainer = () => {
  const [productCarModels, setProductCarModels] = useState([]);
  const [cachedProducts, setCachedProducts] = useState([]); // Cache para mantener los productos
  const { openSnackbar } = useSnackbar();
  const { setSelectedProduct, selectedCarModel, productType } = useProductSelectionContext(); // Obtener el modelId seleccionado
  const { searchTerm, searchOption } = useProductSearchContext();
  const { setLoading, loading } = useProductLoadingContext();
  const { openDialog } = useProductDialogContext();

  const handleProductSelect = (e, item) => {
    const productCarModel = productCarModels.find(pcm => pcm.product.id === item.id);
    setSelectedProduct(productCarModel.product, Screens.PRODUCTS);
    openDialog('view', productCarModel.product.id);
  };

  const handleOnDelete = async (productCarModel) => {
    console.log('handleOnDelete', productCarModel);
    try {
      let result = await deleteProduct(productCarModel.productId);
      if (result) {
        const products = productCarModels.filter(pcm => pcm.product.id !== productCarModel.productId);
        setProductCarModels(products);
        setCachedProducts(products); // Actualizar el cache
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
        let productCarModelsData = [];
        
        if (searchOption === SearchOptions.PRODUCTS) {
          productCarModelsData = await getAllCarModelsProducts(productType, selectedCarModel?.id);

          if (Array.isArray(productCarModelsData) && productCarModelsData.length === 0) {
            openSnackbar('No hay datos para el modelo seleccionado', 'info');
          }
        }
        
        productCarModelsData = productCarModelsData.map(productCarModel => new ProductCarModel(productCarModel));
        const productsWithImages = await Promise.all(productCarModelsData.map(async (productCarModel) => {
          let file = productCarModel.product.files.find(file => file.orderId === 1);
          if (file) {
            const imageUrl = await StorageAdapter.getFileURL(file.storagePath).catch(error => {
              console.error('Error al obtener url imagen de storage para producto:', productCarModel.product.name, error);
              return '';
            });
            return { ...productCarModel, imageUrl };
          }
          return productCarModel;
        }));
        
        setProductCarModels(productsWithImages);
        setCachedProducts(productsWithImages); // Guardar en cache
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        setLoading(false);
        openSnackbar(`Error al cargar los productos: ${error.errorMessage}`, 'error');
      }
    };
    fetchProducts();
  }, [searchOption, selectedCarModel, productType, setLoading, openSnackbar]);

  useEffect(() => {
    const filterProducts = () => {
      if (searchTerm) {
        const filteredProducts = cachedProducts.filter(product => 
          product.product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProductCarModels(filteredProducts);
      } else {
        setProductCarModels(cachedProducts); // Restablecer a los productos en cache si no hay término de búsqueda
      }
    };
    filterProducts();
  }, [searchTerm, cachedProducts]);

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