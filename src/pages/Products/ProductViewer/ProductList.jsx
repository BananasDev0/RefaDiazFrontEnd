import ProductCardList from "../../../components/ProductCardList";

const ProductList = ({ products, onProductSelect, handleOnDelete }) => {
  const menuOptions = [
    {
      label: 'Eliminar',
      onClick: handleOnDelete
    }
  ];

  return (
    <div>
      <ProductCardList 
        products={products}
        onProductSelect={onProductSelect} 
        menuOptions={menuOptions}
      />
    </div>
  );
};

export default ProductList;
