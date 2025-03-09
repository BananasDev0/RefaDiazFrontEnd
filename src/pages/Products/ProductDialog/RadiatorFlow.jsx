import ProductBasicInfo from './ProductBasicInfo';
import ProductDetails from './ProductDetails';
import ProductSummary from '../ProductSummary';
import { ProductTypes } from '../ProductsConstants';
import { useProductDialogForm } from './ProductDialogFormContext';
import { useProductDialogNavigation } from './ProductDialogNavigationContext';
import { DIALOG_STEPS } from './DialogSteps';

const RadiatorFlow = () => {
    const { product } = useProductDialogForm();
    const { currentStep } = useProductDialogNavigation();

    // Usando un objeto para mapear los steps a sus componentes
    const STEP_COMPONENTS = {
        [DIALOG_STEPS.BASIC_INFO]: <ProductBasicInfo />,
        [DIALOG_STEPS.DETAILS]: <ProductDetails />,
        [DIALOG_STEPS.SUBMIT]: <ProductSummary 
            productType={ProductTypes.RADIATOR} 
            product={product} 
            readOnly 
        />
    };

    return (
        <div>
            {STEP_COMPONENTS[currentStep] || null}
        </div>
    );
};

export default RadiatorFlow;
