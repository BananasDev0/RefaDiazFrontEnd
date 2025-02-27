import { ProductTypes } from "../ProductsConstants";
import { useSelectionContext } from "../SelectionContext";
import RadiatorFlow from "./RadiatorFlow";

const ProductFlow = () => {
    const { productType } = useSelectionContext();

    return (
        <div>
            {productType === ProductTypes.RADIATOR && <RadiatorFlow />}
        </div>
    );
}

export default ProductFlow;