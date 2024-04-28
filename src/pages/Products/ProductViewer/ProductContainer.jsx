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

const ProductContainer = () => {
  const [productCarModels, setProductCarModels] = useState([]);
  const { openSnackbar } = useSnackbar();
  const { handleItemSelect, searchTerm, setLoading, selectedCarModel, productType } = useProductsContext();

  const handleProductSelect = (e, radiator) => {
    handleItemSelect(radiator, Screens.PRODUCTS);
  }

  useEffect(() => {
    setLoading(true);

    const fetchProducts = async () => {
      try {
        let response = null;
        let productCarModelsData = [];

        if (selectedCarModel && selectedCarModel.id) {
          response = await getCarModelProducts(selectedCarModel.id, productType, searchTerm);
          productCarModelsData = response.data;
        } else {
          response = await getAllCarModelsProducts('',searchTerm);
          productCarModelsData = response.data;
        }

        productCarModelsData = productCarModelsData.map(productCarModel => new ProductCarModel(productCarModel));

        const productsWithImages = await Promise.all(productCarModelsData.map(async (productCarModel) => {
          console.log(productCarModel.product.files)
          let file = productCarModel.product.files.find(file => file.orderId == 1);
          if (file) {
            console.log(file)
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
    <CSSTransition
      in={productCarModels.length > 0} // Establece la condición para mostrar la animación
      timeout={300}
      classNames="fade"
      unmountOnExit
    >
      <div>
        <ProductList title="Lista de Radiadores" products={productCarModels} onProductSelect={handleProductSelect} />
      </div>
    </CSSTransition>
  );
};

export default ProductContainer;
