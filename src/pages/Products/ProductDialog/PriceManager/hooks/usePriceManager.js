import { useState } from 'react';
import Price from '../../../../../models/Price';
import ProductPrice from '../../../../../models/ProductPrice';
import { useProductDialogForm } from '../../ProductDialogFormContext';
import { modifyAndClone } from '../../../../../util/generalUtils';

export const usePriceManager = () => {
  const { product, setProduct } = useProductDialogForm();
  const [price, setPrice] = useState(new Price({}));

  const handlePriceChange = (field, value) => {
    setPrice(new Price({ ...price, [field]: value }));
  };

  const handleAddPrice = () => {
    const updatedPrices = [...product.prices, new ProductPrice({price})];
    setProduct(modifyAndClone(product, 'prices', updatedPrices));
    setPrice(new Price({}));
  };

  const handleDeletePrice = (index) => {
    const updatedPrices = product.prices.filter((_, i) => i !== index);
    setProduct(modifyAndClone(product, 'prices', updatedPrices));
  };

  return {
    state: {
      product,
      price,
      isAddButtonDisabled: !price.description || !price.cost
    },
    handlers: {
      handlePriceChange,
      handleAddPrice,
      handleDeletePrice
    }
  };
}; 