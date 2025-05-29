import { useEffect, useState } from 'react';
import '../../../styles/brandContainer.css';
import { useSnackbar } from '../../../components/SnackbarContext';
import { getAllCarModelsProducts } from '../../../services/CarModelService';
import { getProductsByType } from '../../../services/ProductService';
import { useProductSelectionContext } from '../ProductSelectionContext';
import { useProductSearchContext } from '../ProductSearchContext';
import { useProductLoadingContext } from '../ProductLoadingContext';
import { ProductTypes, Screens, SearchOptions } from '../ProductsConstants';
import ProductList from './ProductList';
import Product from '../../../models/Product';
import { deleteProduct } from '../../../services/ProductService';
import { Box, CircularProgress } from '@mui/material';
import { useProductDialogContext } from '../ProductDialogContext';
import { StorageAdapter } from '../../../services/StorageAdapter';

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [cachedProducts, setCachedProducts] = useState([]); // Cache para mantener los productos
  const { openSnackbar } = useSnackbar();
  const { setSelectedProduct, selectedCarModel, productType } = useProductSelectionContext(); // Obtener el modelId seleccionado
  const { searchTerm, searchOption } = useProductSearchContext();
  const { setLoading, loading } = useProductLoadingContext();
  const { openDialog } = useProductDialogContext();

  const handleProductSelect = (e, item) => {
    const product = products.find(p => p.id === item.id);
    setSelectedProduct(product, Screens.PRODUCTS);
    openDialog('view', product.id);
  };

  const handleOnDelete = async (product) => {
    console.log('handleOnDelete', product);
    try {
      let result = await deleteProduct(product.id);
      if (result) {
        const updatedProducts = products.filter(p => p.id !== product.id);
        setProducts(updatedProducts);
        setCachedProducts(updatedProducts); // Actualizar el cache
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
        let productData = [];
        
        if (searchOption === SearchOptions.PRODUCTS) {
          if (selectedCarModel?.id) {
            // Si hay modelo seleccionado, usar la función existente
            productData = await getAllCarModelsProducts(productType, selectedCarModel.id);
            
            if (Array.isArray(productData) && productData.length === 0) {
              openSnackbar('No hay datos para el modelo seleccionado', 'info');
            }
            
            // Extraer productos únicos de los ProductCarModels
            const uniqueProductsMap = new Map();
            productData.forEach(pcm => {
              if (!uniqueProductsMap.has(pcm.product.id)) {
                uniqueProductsMap.set(pcm.product.id, new Product(pcm.product));
              }
            });
            
            productData = Array.from(uniqueProductsMap.values());
          } else {
            // Si no hay modelo seleccionado, traer todos los productos de tipo 1
            productData = await getProductsByType(ProductTypes.RADIATOR);
            
            if (Array.isArray(productData) && productData.length === 0) {
              openSnackbar('No hay productos disponibles', 'info');
            }
            
            // Convertir directamente a productos
            productData = productData.map(product => new Product(product));
          }
        }
        
        const productsWithImages = await Promise.all(productData.map(async (product) => {
          let file = product.files.find(file => file.orderId === 1);
          if (file) {
            const imageUrl = await StorageAdapter.getFileURL(file.storagePath).catch(error => {
              console.error('Error al obtener url imagen de storage para producto:', product.name, error);
              return '';
            });
            return { ...product, imageUrl };
          }
          return product;
        }));
        
        setProducts(productsWithImages);
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
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProducts(filteredProducts);
      } else {
        setProducts(cachedProducts); // Restablecer a los productos en cache si no hay término de búsqueda
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
    <ProductList products={products} onProductSelect={handleProductSelect} handleOnDelete={handleOnDelete} />
  );
};

export default ProductContainer;