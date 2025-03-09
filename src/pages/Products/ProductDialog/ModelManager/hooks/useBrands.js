import { useState, useEffect } from 'react';
import { useSnackbar } from '../../../../../components/SnackbarContext';
import Brand from '../../../../../models/Brand';
import { getAllBrands } from '../../../../../services/BrandService';

export const useBrands = () => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(new Brand({}));
  const { openSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brandsData = await getAllBrands();
        setBrands(brandsData);
      } catch (error) {
        openSnackbar(`Error al obtener las marcas: ${error.errorMessage}`, 'error');
      }
    };
    fetchBrands();
  }, []);

  const handleBrandChange = (event) => {
    const brand = brands.find(brand => brand.id === event.target.value);
    setSelectedBrand(brand || new Brand({}));
  };

  return {
    brands,
    selectedBrand,
    handleBrandChange
  };
}; 