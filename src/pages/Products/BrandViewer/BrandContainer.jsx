import { useEffect, useState } from 'react';
import getAllBrands from '../../../services/BrandService';
import { getImageURLFromStorage } from '../../../services/Firebase/storage';
import BrandList from './BrandList'; // Asegúrate de que la ruta sea correcta

const BrandContainer = ({ onBrandSelect }) => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brandsData = await getAllBrands();
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

  return <BrandList brands={brands} onBrandSelect={onBrandSelect}/>;
};

export default BrandContainer;
