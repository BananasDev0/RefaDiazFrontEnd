import { createContext, useContext, useState } from 'react';

const ProductsContext = createContext();

export const useProductsContext = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }) => {
    const [productType, setProductType] = useState('radiadores');
    const [selectedProduct, setSelectedProduct] = useState({});
    const [openDialog, setOpenDialog] = useState(false);

    const handleChangeProductType = (newValue) => {
        setProductType(newValue);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <ProductsContext.Provider value={{
            productType,
            setProductType,
            handleChangeProductType,
            openDialog,
            handleOpenDialog,
            handleCloseDialog,
            selectedProduct,
            setSelectedProduct
        }}>
            {children}
        </ProductsContext.Provider>
    );
};
