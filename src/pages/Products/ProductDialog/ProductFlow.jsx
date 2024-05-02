import { ProductTypes } from "../ProductsConstants";
import { useProductsContext } from "../ProductsContext";
import RadiatorFlow from "./RadiatorFlow";

const ProductFlow = () => {
    const { productType } = useProductsContext();

    return (
        <div>
            {productType === ProductTypes.RADIATOR && <RadiatorFlow />}
        </div>
    );
}

export default ProductFlow;