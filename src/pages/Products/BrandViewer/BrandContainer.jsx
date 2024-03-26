import { useEffect, useState } from 'react';
import { filterBrandsByType, getAllBrands } from '../../../services/BrandService';
import { getImageURLFromStorage } from '../../../services/Firebase/storage';
import BrandList from './BrandList';

const BrandContainer = ({ onBrandSelect }) => {
  const [automotiveBrands, setAutomotiveBrands] = useState([]);
  const [heavyDutyBrands, setHeavyDutyBrands] = useState([]);

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

  return (
    <div>
      <BrandList title="Automotriz" brands={automotiveBrands} onBrandSelect={onBrandSelect} />
      <BrandList title="Carga Pesada" brands={heavyDutyBrands} onBrandSelect={onBrandSelect} />
    </div>
  );
};

export default BrandContainer;
