import { useEffect, useState } from 'react';
import { getAllRadiators } from '../../../services/RadiatorService';
import { getImageURLFromStorage } from '../../../services/Firebase/storage';
import { CSSTransition } from 'react-transition-group'; // Importa CSSTransition
import '../../../styles/brandContainer.css';
import { useSnackbar } from '../../../components/SnackbarContext';
import { getVehicleModelRadiators } from '../../../services/VehicleModelService';
import { useProductsContext } from '../ProductsContext';
import { Screens } from '../ProductsConstants';
import ProductList from './ProductList';

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const { openSnackbar } = useSnackbar();
  const { handleItemSelect, searchTerm, setLoading, selectedCarModel } = useProductsContext();

  const handleProductSelect = (e, radiator) => {
    handleItemSelect(radiator, Screens.PRODUCTS);
  }

  useEffect(() => {
    setLoading(true);
    const fetchRadiators = async () => {
      try {
        let productsData = [];

        if (selectedCarModel && selectedCarModel.id) {
          productsData = await getVehicleModelRadiators(selectedCarModel.id);
        } else {
          productsData = await getAllRadiators(searchTerm);
        }
        const radiatorsWithImages = await Promise.all(productsData.map(async (radiator) => {
          let productImage = radiator.product.productFiles[0];
          if (productImage) {
            const imageUrl = await getImageURLFromStorage(productImage.file.storagePath).catch(error => {
              console.error("Error al obtener url imagen de storage para radiador:", radiator.name, error);
              return '';
            });
            return { ...radiator, imageUrl };
          } else {
            return radiator;
          }
        }));

        setProducts(radiatorsWithImages);
        setLoading(false);

      } catch (error) {
        console.error("Error al obtener los radiadores:", error);
        setLoading(false);
        openSnackbar(`Error al cargar los radiadores!: ${error.errorMessage}`, 'error')
      }
    };

    fetchRadiators();
  }, [searchTerm, setLoading]);


  return (
    <CSSTransition
      in={products.length > 0} // Establece la condición para mostrar la animación
      timeout={300}
      classNames="fade"
      unmountOnExit
    >
      <div>
        <ProductList title="Lista de Radiadores" products={products} onProductSelect={handleProductSelect} />
      </div>
    </CSSTransition>
  );
};

export default ProductContainer;
