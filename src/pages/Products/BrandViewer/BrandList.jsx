import ItemsCardList from '../../../components/ItemCardList';

const columns = [
  { field: 'name', headerName: 'Nombre', showLabel: false, valueStyle: { textTransform: 'uppercase', fontWeight: 'bold', fontSize: '18px'} },
];

const BrandList = ({ brands, onBrandSelect }) => {
  return (
    <div className="brand-list-container">
      <ItemsCardList rows={brands} columns={columns} itemCardProps={{ onClick: onBrandSelect }} />
    </div>
  );
};

export default BrandList;