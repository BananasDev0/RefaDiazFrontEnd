import { useProductDialogContext } from './ProductDialogContext';  // Ajusta la ruta de importación según sea necesario
import RadiatorForm from '../Forms/RadiatorForm';
import ProductBasicInfo from './ProductBasicInfo';
import ProductDetails from './ProductDetails';
import ProductSummary from '../ProductSummary';

const RadiatorFlow = () => {
    const { activeStep, product, associatedVehicleModels, associatedPrices, images} = useProductDialogContext();
    let ComponentToRender = null;

    // Using switch to determine which component to render based on the active step from context
    switch (activeStep) {
        case 0:
            ComponentToRender = <ProductBasicInfo ProductForm={RadiatorForm}/>;
            break;
        // case 1, case 2, etc., can be added here for additional steps
        case 1:
            ComponentToRender = <ProductDetails/>;
            break;
        default:
            ComponentToRender = <ProductSummary productType='radiadores' product={product} associatedVehicleModels={associatedVehicleModels} associatedPrices={associatedPrices} images={images} readOnly/>;
            break;
    }

    return (
        <div>
            {ComponentToRender}
        </div>
    );
};

export default RadiatorFlow;
