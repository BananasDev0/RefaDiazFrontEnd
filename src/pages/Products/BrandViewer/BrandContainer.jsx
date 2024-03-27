import { useEffect, useState } from 'react';
import { filterBrandsByType, getAllBrands } from '../../../services/BrandService';
import { getAllRadiators } from '../../../services/RadiatorService';
import { getImageURLFromStorage } from '../../../services/Firebase/storage';
import BrandList from './BrandList';
import { Select, MenuItem } from '@mui/material';
import CustomInput from '../../../components/CustomInput';

const BrandContainer = ({ onBrandSelect }) => {
  const [automotiveBrands, setAutomotiveBrands] = useState([]);
  const [heavyDutyBrands, setHeavyDutyBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('marcas');
  const [filteredBrands, setFilteredBrands] = useState({ automotive: [], heavyDuty: [] });

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        let brandsData = [];

        if (searchOption === 'marcas') {
          brandsData = await getAllBrands();
        } else if (searchOption === 'radiadores') {
          brandsData = await getAllRadiators(searchTerm); // Pasar searchTerm como el nombre
        }

        const automotiveBrandsData = await filterBrandsByType(brandsData, 1);
        const heavyDutyBrandsData = await filterBrandsByType(brandsData, 2);

        const automotiveBrandsWithImages = await Promise.all(automotiveBrandsData.map(async (brand) => {
          if (brand.imageUrl) {
            const imageUrl = await getImageURLFromStorage(brand.imageUrl).catch(error => {
              console.error("Error al obtener url imagen de storage para marca:", brand.name, error);
              return ''; 
            });
            return { ...brand, imageUrl };
          } else {
            return brand;
          }
        }));

        const heavyDutyBrandsWithImages = await Promise.all(heavyDutyBrandsData.map(async (brand) => {
          if (brand.imageUrl) {
            const imageUrl = await getImageURLFromStorage(brand.imageUrl).catch(error => {
              console.error("Error al obtener url imagen de storage para marca:", brand.name, error);
              return ''; 
            });
            return { ...brand, imageUrl };
          } else {
            return brand;
          }
        }));

        setAutomotiveBrands(automotiveBrandsWithImages);
        setHeavyDutyBrands(heavyDutyBrandsWithImages);
      } catch (error) {
        console.error("Error al obtener las marcas:", error);
      }
    };

    fetchBrands();
  }, [searchOption, searchTerm]);

  useEffect(() => {
    const filterBrands = () => {
      const filteredAutomotiveBrands = automotiveBrands.filter(brand =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const filteredHeavyDutyBrands = heavyDutyBrands.filter(brand =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBrands({ automotive: filteredAutomotiveBrands, heavyDuty: filteredHeavyDutyBrands });
    };

    filterBrands();
  }, [searchTerm, automotiveBrands, heavyDutyBrands]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchOptionChange = (e) => {
    setSearchOption(e.target.value);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
        <Select
          value={searchOption}
          onChange={handleSearchOptionChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Buscar por' }}
          sx={{ height: '35px', marginRight: '5px' }}
        >
          <MenuItem value="marcas">Marcas</MenuItem>
          <MenuItem value="radiadores">Radiadores</MenuItem>
        </Select>
        <div style={{ flex: 1 }}>
          <CustomInput
            placeholder={`Buscar ${searchOption}...`}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <BrandList title="Automotriz" brands={filteredBrands.automotive} onBrandSelect={onBrandSelect} />
      <BrandList title="Carga Pesada" brands={filteredBrands.heavyDuty} onBrandSelect={onBrandSelect} />
    </div>
  );
};

export default BrandContainer;