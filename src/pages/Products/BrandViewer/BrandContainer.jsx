import { useEffect, useState } from 'react';
import { getAllBrands } from '../../../services/BrandService';
import { getImageURLFromStorage } from '../../../services/Firebase/storage';
import BrandList from './BrandList';

const BrandContainer = ({ onBrandSelect, searchTerm }) => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brandsData = await getAllBrands();

        // Obtener todas las imágenes en una sola operación y almacenarlas.
        const brandsWithImages = await Promise.all(brandsData.map(async (brand) => {
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

        setBrands(brandsWithImages);
      } catch (error) {
        console.error("Error al obtener las marcas:", error);
      }
    };

    fetchBrands();
  }, []);

  const getFilteredBrands = (brandTypeId) => {
    return brands
      .filter(brand => brand.brandTypeId === brandTypeId)
      .filter(brand => brand.name.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  return (
    <div>
      <BrandList title="Automotriz" brands={getFilteredBrands(1)} onBrandSelect={onBrandSelect} />
      <BrandList title="Carga Pesada" brands={getFilteredBrands(2)} onBrandSelect={onBrandSelect} />
    </div>
  );
};

export default BrandContainer;
