import CapManager from './CapManager/CapManager';
import ModelManager from './ModelManager';
import PriceManager from './PriceManager';
import ProviderManager from './ProviderManager';

const ProductDetails = () => {

  return (
    <>
      <ModelManager></ModelManager>
      <PriceManager />
      <ProviderManager />
      <CapManager />
    </>
  );
};

export default ProductDetails;
