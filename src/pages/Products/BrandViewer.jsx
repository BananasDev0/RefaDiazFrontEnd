import  { useEffect, useState } from 'react';
import ItemsCardList from '../../components/ItemCardList'; // Verifica la ruta
import getAllBrands from '../../services/BrandService';
import { getImageURLFromStorage } from '../../services/Firebase/storage';

const columns = [
  { field: 'name', headerName: 'Nombre', showLabel: false, valueStyle: { textTransform: 'uppercase', fontWeight: 'bold', fontSize: '18px'} }, // `showLabel: false` para no mostrar el label
];

const BrandViewer = () => {
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

  return (
    <div>
      <ItemsCardList rows={brands} columns={columns} itemCardProps={{}} />
    </div>
  );
};

export default BrandViewer;
