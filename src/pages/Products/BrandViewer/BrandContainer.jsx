import { useEffect, useState } from 'react';
import { getAllBrands } from '../../../services/BrandService';
import { getImageURLFromStorage } from '../../../services/Firebase/storage';
import { CSSTransition } from 'react-transition-group'; // Importa CSSTransition
import BrandList from './BrandList';
import '../../../styles/brandContainer.css';
import { useSnackbar } from '../../../components/SnackbarContext';
import { useProductsContext } from '../ProductsContext';
import { Screens } from '../ProductsConstants';
import CarModelListContainer from '../ModelViewer/CarModelContainer';
import ListContainer from '../ListContainer';

const BrandContainer = ({navigate}) => {
  const [brands, setBrands] = useState([]);
  const { openSnackbar } = useSnackbar();
  const { handleItemSelect, searchTerm, setLoading, navigateBack} = useProductsContext();

  const onBrandSelect = (e, brand) => {
    handleItemSelect(brand, Screens.BRANDS);
    navigate(<CarModelListContainer/>, 'Modelos', navigateBack);
  }

  useEffect(() => {
    setLoading(true);
    const fetchBrands = async () => {
      try {
        const brandsData = await getAllBrands();

        const brandsWithImages = await Promise.all(brandsData.map(async (brand) => {
          if (brand.file) {
            const imageUrl = await getImageURLFromStorage(brand.file.storagePath).catch(error => {
              console.error("Error al obtener url imagen de storage para marca:", brand.name, error);
              return '';
            });
            return { ...brand, imageUrl };
          } else {
            return brand;
          }
        }));

        setBrands(brandsWithImages);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las marcas:", error);
        openSnackbar(error.errorMessage, "error");
        setLoading(false);
      }
    };

    fetchBrands();
  }, [setLoading]);

  return (
    <ListContainer>
      <CSSTransition
        in={brands.length > 0}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <div>
          <BrandList 
            title="Automotriz" 
            brands={brands.filter(brand => 
              brand.brandTypeId === 1 && brand.name.toLowerCase().includes(searchTerm.toLowerCase())
            )} 
            onBrandSelect={onBrandSelect} 
          />
          <BrandList 
            title="Carga Pesada" 
            brands={brands.filter(brand => 
              brand.brandTypeId === 2 && brand.name.toLowerCase().includes(searchTerm.toLowerCase())
            )} 
            onBrandSelect={onBrandSelect} 
          />
        </div>
      </CSSTransition>
    </ListContainer>
  );
};

export default BrandContainer;
