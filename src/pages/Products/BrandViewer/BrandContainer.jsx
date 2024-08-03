import { useEffect, useState } from 'react';
import { getAllBrands } from '../../../services/BrandService';
import { getImageURLFromStorage } from '../../../services/Firebase/storage';
import { CSSTransition } from 'react-transition-group';
import BrandList from './BrandList';
import '../../../styles/brandContainer.css';
import { useSnackbar } from '../../../components/SnackbarContext';
import { useProductsContext } from '../ProductsContext';
import { Tabs, Tab, Box, CircularProgress } from '@mui/material';

const BrandContainer = () => {
  const [brands, setBrands] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true); // Manejando el estado de carga localmente
  const { openSnackbar } = useSnackbar();
  const { searchTerm } = useProductsContext();

  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      try {
        const brandsData = await getAllBrands();
        const brandsWithImages = await Promise.all(
          brandsData.map(async (brand) => {
            if (brand.file) {
              const imageUrl = await getImageURLFromStorage(brand.file.storagePath).catch((error) => {
                console.error('Error al obtener url imagen de storage para marca:', brand.name, error);
                return '';
              });
              return { ...brand, imageUrl };
            } else {
              return brand;
            }
          })
        );
        setBrands(brandsWithImages);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las marcas:', error);
        openSnackbar(error.errorMessage, 'error');
        setLoading(false);  // Asegurarse de desactivar el loading también en caso de error
      }
    };
    fetchBrands();
  }, [openSnackbar, searchTerm]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredBrands = (brandTypeId) => {
    return brands.filter(
      (brand) => brand.brandTypeId === brandTypeId && brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress size={40} />
      </Box>
    );
  }

  return (
    <Box>
      <CSSTransition in={brands.length > 0} timeout={300} classNames="fade" unmountOnExit>
        <div>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="brand type tabs">
              <Tab label="Automotriz" />
              <Tab label="Carga Pesada" />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <BrandList brands={filteredBrands(1)} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <BrandList brands={filteredBrands(2)} />
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