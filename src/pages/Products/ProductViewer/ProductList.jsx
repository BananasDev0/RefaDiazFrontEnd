import ItemsCardList from "../../../components/ItemCardList";

const columns = [
  { field: 'dpi', headerName: 'DPI', showLabel: false, valueStyle: { fontWeight: 'bold', fontSize: '16px'} },
  { field: 'name', headerName: 'Nombre', showLabel: false, valueStyle: { fontSize: '16px' } }
];

const ProductList = ({ products, onProductSelect }) => {
  return (
    <div>
      <ItemsCardList rows={products.map(productCarModel => ({
        id: productCarModel.product.id,
        dpi: productCarModel.productdpi,
        name: productCarModel.product.name,
        imageUrl: productCarModel.imageUrl // Se muestra la imagen
      }))} columns={columns} itemCardProps={{onClick: onProductSelect}} />
    </div>
  );
};

export default ProductList;
