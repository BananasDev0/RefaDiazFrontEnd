import ItemsCardList from "../../../components/ItemCardList";

const columns = [
  { field: 'dpi', headerName: 'DPI', showLabel: false, valueStyle: { fontWeight: 'bold', fontSize: '16px'} },
  { field: 'name', headerName: 'Nombre', showLabel: false, valueStyle: { fontSize: '16px' } }
];

const ProductList = ({ products, onProductSelect, handleOnDelete }) => {
  return (
    <div>
      <ItemsCardList rows={products.map( product => ({
        id: product.id,
        dpi: product.dpi,
        name: product.name,
        imageUrl: product.imageUrl // Se muestra la imagen
      }))} columns={columns} itemCardProps={{onClick: onProductSelect, menuOptions: [
        {
          label: 'Eliminar',
          onClick: handleOnDelete
        }
      ]}} />
    </div>
  );
};

export default ProductList;
