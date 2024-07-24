import { useEffect, useState } from 'react';
import { getImageURLFromStorage } from '../../../services/Firebase/storage';
import { CSSTransition } from 'react-transition-group'; // Importa CSSTransition
import '../../../styles/brandContainer.css';
import { useSnackbar } from '../../../components/SnackbarContext';
import { getAllCarModelsProducts, getCarModelProducts } from '../../../services/CarModelService';
import { useProductsContext } from '../ProductsContext';
import { Screens } from '../ProductsConstants';
import ProductList from './ProductList';
import { ProductCarModel } from '../../../models/ProductCarModel';
import { deleteProduct } from '../../../services/ProductService';
import ListContainer from '../ListContainer';

const ProductContainer = () => {
  const [productCarModels, setProductCarModels] = useState([]);
  const { openSnackbar } = useSnackbar();
  const { handleItemSelect, searchTerm, setLoading, selectedCarModel, productType } = useProductsContext();

  const handleProductSelect = (e, item) => {
    const productCarModel = productCarModels.find(productCarModel => productCarModel.product.id === item.id);
    handleItemSelect(productCarModel.product, Screens.PRODUCTS);
  }

  const handleOnDelete = async (productCarModel) => {
    try {
      console.log(productCarModel)
      let result = await deleteProduct(productCarModel.id);
      if (result) {
        const products = productCarModels.filter(pcm => pcm.product.id !== productCarModel.id);
        setProductCarModels(products);
        openSnackbar('Producto eliminado correctamente', 'success');
      } else {
        openSnackbar('Error al eliminar el producto', 'error');
      }
    } catch (error) {
      openSnackbar(`Error al eliminar el producto: ${error.errorMessage}`, 'error');
    }
  }

  useEffect(() => {
    setLoading(true);

    const fetchProducts = async () => {
      try {
        setProductCarModels([]);
        let response = null;
        let productCarModelsData = [];

        if (selectedCarModel && selectedCarModel.id) {
          response = await getCarModelProducts(selectedCarModel.id, productType, searchTerm);
          productCarModelsData = response.data;
        } else {
          response = await getAllCarModelsProducts(productType,searchTerm);
          productCarModelsData = response.data;
        }

        productCarModelsData = productCarModelsData.map(productCarModel => new ProductCarModel(productCarModel));

        const productsWithImages = await Promise.all(productCarModelsData.map(async (productCarModel) => {
          let file = productCarModel.product.files.find(file => file.orderId == 1);
          if (file) {
            const imageUrl = await getImageURLFromStorage(file.storagePath).catch(error => {
              console.error("Error al obtener url imagen de storage para producto:", productCarModel.product.name, error);
              return '';
            });
            return { ...productCarModel, imageUrl };
          } else {
            return productCarModel;
          }
        }));

        setProductCarModels(productsWithImages);
        setLoading(false);

      } catch (error) {
        console.error("Error al obtener los radiadores:", error);
        setLoading(false);
        openSnackbar(`Error al cargar los radiadores!: ${error.errorMessage}`, 'error')
      }
    }

    fetchProducts();
  }, [searchTerm, setLoading]);


  return (
    <ListContainer>
      <CSSTransition
      in={productCarModels.length > 0} // Establece la condición para mostrar la animación
      timeout={300}
      classNames="fade"
      unmountOnExit
    >
      <div>
        <ProductList products={productCarModels} onProductSelect={handleProductSelect} handleOnDelete={handleOnDelete}/>
      </div>
    </CSSTransition>
    </ListContainer>
  );
};

export default ProductContainer;
