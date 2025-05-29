import ProductCardList from "../../../components/ProductCardList";

const ProductList = ({ products, onProductSelect, handleOnDelete }) => {
  return (
    <div>
      <ItemsCardList rows={products.map(product => ({
        id: product.id,
        dpi: product.dpi,
        productId: product.id,
        name: product.name,
        imageUrl: product.imageUrl // Se muestra la imagen
      }))} columns={columns}
        cardContentMinHeight={150}
        itemCardProps={{
          onClick: onProductSelect, menuOptions: [
            {
              label: 'Eliminar',
              onClick: handleOnDelete
            }
          ]
        }} />
    </div>
  );
};

export default ProductList;
