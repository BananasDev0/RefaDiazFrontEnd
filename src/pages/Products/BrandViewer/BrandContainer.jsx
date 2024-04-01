import { useEffect, useState } from 'react';
import { getAllBrands } from '../../../services/BrandService';
import { getImageURLFromStorage } from '../../../services/Firebase/storage';
import BrandList from './BrandList';
import '../../../styles/brandContainer.css';

const BrandContainer = ({ onBrandSelect, searchTerm, setLoading }) => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las marcas:", error);
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return (
    <div>
      <BrandList title="Automotriz" brands={brands.filter(brand => brand.brandTypeId === 1 && brand.name.toLowerCase().includes(searchTerm.toLowerCase()))} onBrandSelect={onBrandSelect} />
      <BrandList title="Carga Pesada" brands={brands.filter(brand => brand.brandTypeId === 2 && brand.name.toLowerCase().includes(searchTerm.toLowerCase()))} onBrandSelect={onBrandSelect} />
    </div>
  );
};

export default BrandContainer;
