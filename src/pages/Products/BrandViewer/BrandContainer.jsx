import { useEffect, useState } from 'react';
import { filterBrandsByType, getAllBrands } from '../../../services/BrandService';
import { getAllRadiators } from '../../../services/RadiatorService';
import { getImageURLFromStorage } from '../../../services/Firebase/storage';
import BrandList from './BrandList';
import CustomSearchBar from '../../../components/CustomSearchBar';
import RadiatorList from '../RadiatorViewer/RadiatorList';

const BrandContainer = ({ onBrandSelect, onRadiatorSelect }) => {
  const [automotiveBrands, setAutomotiveBrands] = useState([]);
  const [heavyDutyBrands, setHeavyDutyBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('marcas');
  const [filteredBrands, setFilteredBrands] = useState({ automotive: [], heavyDuty: [] });
  const [radiators, setRadiators] = useState([]); 

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        let brandsData = [];

        if (searchOption === 'marcas') {
          brandsData = await getAllBrands();
        } else if (searchOption === 'radiadores') {
          const radiatorData = await getAllRadiators(searchTerm);
          setRadiators(radiatorData); 
          return; 
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
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  };

  const handleSearchOptionChange = (e) => {
    setSearchOption(e.target.value);
  };

  return (
    <div>
      <CustomSearchBar
        searchOption={searchOption}
        searchTerm={searchTerm}
        handleSearchOptionChange={handleSearchOptionChange}
        handleSearchChange={handleSearchChange}
      />
      {searchOption === 'radiadores' ? (
        <RadiatorList radiators={radiators} onRadiatorSelect={onRadiatorSelect} />
      ) : (
        <>
          <BrandList title="Automotriz" brands={filteredBrands.automotive} onBrandSelect={onBrandSelect} />
          <BrandList title="Carga Pesada" brands={filteredBrands.heavyDuty} onBrandSelect={onBrandSelect} />
        </>
      )}
    </div>
  );
};

export default BrandContainer;
