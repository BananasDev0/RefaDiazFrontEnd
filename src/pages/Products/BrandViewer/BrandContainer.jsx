import { useState, useEffect } from 'react';
import { getAllBrands } from '../../../services/BrandService';
import { getImageURLFromStorage } from '../../../services/Firebase/storage';
import { CircularProgress } from '@mui/material';
import BrandList from './BrandList';

const BrandContainer = ({ onBrandSelect, searchTerm }) => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true); // Nuevo estado para controlar la carga

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
        setLoading(false); // Cambiar el estado de carga cuando los datos están cargados
      } catch (error) {
        console.error("Error al obtener las marcas:", error);
        setLoading(false); // Manejar el estado de carga en caso de error
      }
    };

    fetchBrands();
  }, []);

  return (
    <div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <CircularProgress size={40} />
        </div>
      ) : (
        <>
          <BrandList title="Automotriz" brands={brands.filter(brand => brand.brandTypeId === 1 && brand.name.toLowerCase().includes(searchTerm.toLowerCase()))} onBrandSelect={onBrandSelect} />
          <BrandList title="Carga Pesada" brands={brands.filter(brand => brand.brandTypeId === 2 && brand.name.toLowerCase().includes(searchTerm.toLowerCase()))} onBrandSelect={onBrandSelect} />
        </>
      )}
    </div>
  );
};

export default BrandContainer;
