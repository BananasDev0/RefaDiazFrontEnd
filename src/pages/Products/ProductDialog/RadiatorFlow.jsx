import RadiatorForm from '../Forms/RadiatorForm';
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
            ComponentToRender = <div>Step not found</div>;
    }

    return (
        <div>
            {ComponentToRender}
        </div>
    );
};

export default RadiatorFlow;
