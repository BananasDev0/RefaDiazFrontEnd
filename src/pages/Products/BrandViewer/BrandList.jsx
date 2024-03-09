import ItemsCardList from '../../../components/ItemCardList'; // Verifica la ruta

const columns = [
  { field: 'name', headerName: 'Nombre', showLabel: false, valueStyle: { textTransform: 'uppercase', fontWeight: 'bold', fontSize: '18px'} },
];

const BrandList = ({ brands }) => {
  return (
    <div>
      <ItemsCardList rows={brands} columns={columns} itemCardProps={{}} />
    </div>
  );
};

export default BrandList;

