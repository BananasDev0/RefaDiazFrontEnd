import { Tab, Tabs } from "@mui/material"
import { useProductsContext } from "./ProductsContext";
import { useMobile } from "../../components/MobileProvider";
import { ProductTypes } from "./ProductsConstants";

export const ProductTypeTabs = () => {
    const { productType, handleChangeProductType } = useProductsContext();
    const responsive = useMobile();

    const handleChange = (event, newValue) => {
        handleChangeProductType(newValue);
    };


    return <Tabs
        value={productType}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="product tabs"
        sx={{ width: responsive.isMobile ? '85vw' : '100%' }}
    >
        <Tab value={ProductTypes.RADIATOR} label="Radiadores" />
        <Tab value={ProductTypes.CAP} label="Tapas" />
        <Tab value={ProductTypes.FAN} label="Abanicos" />
    </Tabs>
}