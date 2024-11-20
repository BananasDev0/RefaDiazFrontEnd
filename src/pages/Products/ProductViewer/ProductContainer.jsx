import { useEffect, useState } from 'react';
import { getImageURLFromStorage } from '../../../services/Firebase/storage';
import '../../../styles/brandContainer.css';
import { useSnackbar } from '../../../components/SnackbarContext';
import { getAllCarModelsProducts, getCarModelProducts } from '../../../services/CarModelService';
import { useProductsContext } from '../ProductsContext';
import { ProductTypes, Screens } from '../ProductsConstants';
import ProductList from './ProductList';
import { ProductCarModel } from '../../../models/ProductCarModel';
import { deleteProduct, getProductById } from '../../../services/ProductService';
import { Box, CircularProgress } from '@mui/material';

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const { openSnackbar } = useSnackbar();
  const { handleItemSelect, searchTerm, setLoading, selectedCarModel, productType, loading, selectedProduct } = useProductsContext();

  const handleProductSelect = (e, item) => {
    const product = products.find(product => product.id === item.id);
    handleItemSelect(product, Screens.PRODUCTS);
  }

  const handleOnDelete = async (product) => {
    try {
      let result = await deleteProduct(product.id);
      if (result) {
        const filteredProducts = products.filter(p => p.id !== product.id);
        setProducts(filteredProducts);
        openSnackbar('Producto eliminado correctamente', 'success');
      } else {
        openSnackbar('Error al eliminar el producto', 'error');
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      openSnackbar(`Error al eliminar el producto: ${error.errorMessage}`, 'error');
    }
  }

  useEffect(() => {
    setLoading(true);

    const fetchProductCarModels = async () => {
      try {
        let response = null;
        if (selectedCarModel && selectedCarModel.id) {
          response = await getCarModelProducts(selectedCarModel.id, productType, searchTerm);
        } else {
          response = await getAllCarModelsProducts(productType, searchTerm);
        }
        return response.data.map(productCarModel => new ProductCarModel(productCarModel));
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        throw error;
      }
    };

    const fetchProductImages = async (productsData) => {
      return await Promise.all(productsData.map(async (product) => {
        let file = product.files.find(file => file.orderId == 1);
        if (file) {
          const imageUrl = await getImageURLFromStorage(file.storagePath).catch(error => {
            console.error("Error al obtener url imagen de storage para producto:", product.name, error);
            return '';
          });
          return { ...product, imageUrl };
        } else {
          return product;
        }
      }));
    };

    const fetchProducts = async () => {
      try {
        let products = [];
        setProducts([]);
        if (productType === ProductTypes.RADIATOR) {
          const productCarModelsData = await fetchProductCarModels();
          products = productCarModelsData.map(productCarModel => productCarModel.product);
        } else if (productType === ProductTypes.CAP) {
          products = await getProductById(selectedProduct.id);
        }
        const productsWithImages = await fetchProductImages(products);
        setProducts(productsWithImages);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        openSnackbar(`Error al cargar los radiadores!: ${error.errorMessage}`, 'error');
      }
    };

    fetchProducts();
  }, [searchTerm, setLoading, selectedCarModel, productType, openSnackbar]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress size={40} />
      </Box>
    );
  }

  return (
    <ProductList products={products} onProductSelect={handleProductSelect} handleOnDelete={handleOnDelete} />
  );
};

export default ProductContainer;
