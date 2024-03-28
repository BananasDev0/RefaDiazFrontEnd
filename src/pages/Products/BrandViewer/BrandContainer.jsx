import { useEffect, useState } from 'react';
import { filterBrandsByType, getAllBrands } from '../../../services/BrandService';
import { getImageURLFromStorage } from '../../../services/Firebase/storage';
import BrandList from './BrandList';

const BrandContainer = ({ onBrandSelect, searchTerm }) => {
  const [automotiveBrands, setAutomotiveBrands] = useState([]);
  const [heavyDutyBrands, setHeavyDutyBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState({ automotiveBrands: [], heavyDutyBrands: [] });

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        let brandsData = [];

        brandsData = await getAllBrands();

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
        setFilteredBrands({
          automotiveBrands: automotiveBrandsWithImages, heavyDutyBrands: heavyDutyBrandsWithImages
        })
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
      setFilteredBrands({
        automotiveBrands: filteredAutomotiveBrands, heavyDutyBrands: filteredHeavyDutyBrands
      })

    };

    setFilteredBrands({
      automotiveBrands, heavyDutyBrands
    })

    if (searchTerm) {
      filterBrands();
    }
  }, [searchTerm]);

  return (
    <div>
      <>
        <BrandList title="Automotriz" brands={filteredBrands.automotiveBrands} onBrandSelect={onBrandSelect} />
        <BrandList title="Carga Pesada" brands={filteredBrands.heavyDutyBrands} onBrandSelect={onBrandSelect} />
      </>
    </div>
  );
};

export default BrandContainer;