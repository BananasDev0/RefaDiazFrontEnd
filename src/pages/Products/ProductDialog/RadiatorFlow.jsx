import RadiatorForm from '../Forms/RadiatorForm';
import PriceManager from './PriceManager';
import ProductDetail from './ProductDetail';

const RadiatorFlow = (props) => {
    let ComponentToRender = null;

    // Using switch to determine which component to render based on props.index
    switch (props.index) {
        case 0:
            ComponentToRender = <ProductDetail ProductForm={RadiatorForm} {...props}/>;
            break;
        // case 1, case 2, etc., can be added here for additional steps
        default:
            ComponentToRender = <PriceManager/>;
    }

    return (
        <div>
            {ComponentToRender}
        </div>
    );
};

export default RadiatorFlow;
