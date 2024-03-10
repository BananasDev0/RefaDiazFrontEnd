import ItemsCardList from '../../../components/ItemCardList'; // Verifica la ruta

const columns = [
  { field: 'name', headerName: 'Nombre', showLabel: false, valueStyle: { textTransform: 'uppercase', fontWeight: 'bold', fontSize: '18px'} },
];

const BrandList = ({ brands, onBrandSelect }) => {
  return (
    <div>
      <ItemsCardList rows={brands} columns={columns} itemCardProps={{onClick: onBrandSelect}} />
    </div>
  );
};

export default BrandList;

