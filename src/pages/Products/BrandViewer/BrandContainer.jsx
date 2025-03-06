import { useEffect, useState, useMemo } from 'react';
import { getAllBrands } from '../../../services/BrandService';
import { StorageAdapter } from '../../../services/StorageAdapter';
import { CSSTransition } from 'react-transition-group';
import BrandList from './BrandList';
import '../../../styles/brandContainer.css';
import { useSnackbar } from '../../../components/SnackbarContext';
import { useProductSelectionContext } from '../ProductSelectionContext';
import { useProductSearchContext } from '../ProductSearchContext';
import { useProductLoadingContext } from '../ProductLoadingContext';
import { Tabs, Tab, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../../constants/paths';

// Caché para almacenar URLs de imágenes
const imageCache = new Map();

const BrandContainer = () => {
  const [allBrands, setAllBrands] = useState([]); // Todos los datos iniciales
  const [tabValue, setTabValue] = useState(0);
  const { openSnackbar } = useSnackbar();
  const { searchTerm } = useProductSearchContext();
  const { setSelectedBrand } = useProductSelectionContext();
  const { setLoading: setGlobalLoading } = useProductLoadingContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrands = async () => {
      setGlobalLoading(true);
      try {
        const brandsData = await getAllBrands(''); // Carga todos los datos sin filtro
        const brandsWithImages = await Promise.all(
          brandsData.map(async (brand) => {
            if (brand.file) {
              const cacheKey = brand.file.storagePath;
              let imageUrl = imageCache.get(cacheKey);
              if (!imageUrl) {
                imageUrl = await StorageAdapter.getFileURL(brand.file.storagePath).catch((error) => {
                  console.error('Error al obtener url imagen de storage para marca:', brand.name, error);
                  return '';
                });
                imageCache.set(cacheKey, imageUrl);
              }
              return { ...brand, imageUrl };
            }
            return brand;
          })
        );
        setAllBrands(brandsWithImages);
        setGlobalLoading(false);
      } catch (error) {
        console.error('Error al obtener las marcas:', error);
        openSnackbar(error.errorMessage, 'error');
        setGlobalLoading(false);
      }
    };
    fetchBrands();
  }, [openSnackbar, setGlobalLoading]);

  const filteredBrands = useMemo(() => (brandTypeId) => {
    return allBrands.filter(
      (brand) => brand.brandTypeId === brandTypeId && brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allBrands, searchTerm]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOnBrandSelect = (e, brand) => {
    setSelectedBrand(brand);
    navigate(PATHS.MODELS);
  };

  if (!allBrands.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress size={40} />
      </Box>
    );
  }

  return (
    <Box>
      <CSSTransition in={allBrands.length > 0} timeout={300} classNames="fade" unmountOnExit>
        <div>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="brand type tabs">
              <Tab label="Automotriz" />
              <Tab label="Carga Pesada" />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <BrandList brands={filteredBrands(1)} onBrandSelect={handleOnBrandSelect} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <BrandList brands={filteredBrands(2)} onBrandSelect={handleOnBrandSelect} />
          </TabPanel>
        </div>
      </CSSTransition>
    </Box>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default BrandContainer;