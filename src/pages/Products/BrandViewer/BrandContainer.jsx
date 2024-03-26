import { useEffect, useState } from 'react';
import { filterBrandsByType, getAllBrands } from '../../../services/BrandService';
import { getImageURLFromStorage } from '../../../services/Firebase/storage';
import BrandList from './BrandList';
import { Input } from '@mui/material';

const BrandContainer = ({ onBrandSelect }) => {
  const [automotiveBrands, setAutomotiveBrands] = useState([]);
  const [heavyDutyBrands, setHeavyDutyBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBrands, setFilteredBrands] = useState({ automotive: [], heavyDuty: [] });

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const allBrands = await getAllBrands();

        const automotiveBrandsData = await filterBrandsByType(allBrands, 1);
        const heavyDutyBrandsData = await filterBrandsByType(allBrands, 2);

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
  }, []);

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

  return (
    <div>
      <Input
        placeholder="Buscar marcas..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <BrandList title="Automotriz" brands={filteredBrands.automotive} onBrandSelect={onBrandSelect} />
      <BrandList title="Carga Pesada" brands={filteredBrands.heavyDuty} onBrandSelect={onBrandSelect} />
    </div>
  );
};

export default BrandContainer;
