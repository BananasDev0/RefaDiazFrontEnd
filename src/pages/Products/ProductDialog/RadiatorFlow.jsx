import { useProductDialogContext } from './ProductDialogContext';  // Ajusta la ruta de importación según sea necesario
import RadiatorForm from '../Forms/RadiatorForm';
import ProductBasicInfo from './ProductBasicInfo';
import ProductDetails from './ProductDetails';

const RadiatorFlow = () => {
    const { activeStep } = useProductDialogContext();
    let ComponentToRender = null;

    // Using switch to determine which component to render based on the active step from context
    switch (activeStep) {
        case 0:
            ComponentToRender = <ProductBasicInfo ProductForm={RadiatorForm}/>;
            break;
        // case 1, case 2, etc., can be added here for additional steps
        default:
            ComponentToRender = <ProductDetails/>;
    }

    return (
        <div>
            {ComponentToRender}
        </div>
    );
};

export default RadiatorFlow;
