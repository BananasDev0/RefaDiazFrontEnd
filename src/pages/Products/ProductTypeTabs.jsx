import { Tab, Tabs } from "@mui/material"
import { useProductsContext } from "./ProductsContext";
import { useMobile } from "../../components/MobileProvider";

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
        <Tab value="radiadores" label="Radiadores" />
        <Tab value="tapas" label="Tapas" />
        <Tab value="abanicos" label="Abanicos" />
    </Tabs>
}