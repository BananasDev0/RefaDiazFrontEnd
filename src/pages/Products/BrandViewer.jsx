import  { useEffect, useState } from 'react';
import ItemsCardList from '../../components/ItemCardList'; // Verifica la ruta
import getAllBrands from '../../services/BrandService';

const columns = [
  { field: 'name', headerName: 'Nombre', showLabel: false, valueStyle: { textTransform: 'uppercase', fontWeight: 'bold', fontSize: '18px'} }, // `showLabel: false` para no mostrar el label
];

const BrandViewer = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const brandsData = await getAllBrands();
      setBrands(brandsData);
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
