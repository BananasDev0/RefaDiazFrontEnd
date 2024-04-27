import { createContext, useContext, useState } from 'react';
import { ProductTypes, Screens, SearchOptions } from './ProductsConstants';

const ProductsContext = createContext();

export const useProductsContext = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }) => {
    const [productType, setProductType] = useState(ProductTypes.RADIATOR);
    const [currentScreen, setCurrentScreen] = useState(Screens.BRANDS);
    const [openDialog, setOpenDialog] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedCarModel, setSelectedCarModel] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [searchOption, setSearchOption] = useState('marcas');

    const [loading, setLoading] = useState(false);

    const handleItemSelect = (item, type) => {
        setSearchTerm('');

        switch (type) {
            case Screens.BRANDS:
                setSelectedBrand(item);
                setSearchOption(SearchOptions.MODELS);
                setCurrentScreen(Screen.VEHICLES);
                break;
            case Screens.MODELS:
                setSelectedCarModel(item);
                setSearchOption(SearchOptions.PRODUCTS);
                setCurrentScreen(Screen.RADIATORS);
                break;
            case Screens.PRODUCTS:
                setSelectedProduct(item);
                break;
            default:
                console.log('Tipo de selección no reconocido:', type);
        }
    };


    const handleChangeProductType = (newValue) => {
        setProductType(newValue);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleBack = (screen) => {
        if (screen === Screens.BRANDS) {
            setCurrentScreen(Screens.BRANDS);
            setSearchOption(SearchOptions.BRANDS);
            setSelectedBrand(null);
            setSelectedCarModel(null);
        } else if (screen === Screens.MODELS) {
            setCurrentScreen(Screens.MODELS);
            setSelectedCarModel(null);
        }
    };

    const handleSearchOptionChange = (value) => {
        setSearchTerm('');
        setSelectedBrand(null);
        setSelectedCarModel(null);
        setSearchOption(value);
        if (value === SearchOptions.BRANDS) {
            setCurrentScreen(Screens.BRANDS);
        } else if (value === SearchOptions.MODELS) {
            setCurrentScreen(Screens.MODELS);
        } else {
            setCurrentScreen(Screens.PRODUCTS);
        }
    };


    return (
        <ProductsContext.Provider value={{
            handleBack,
            handleChangeProductType,
            handleCloseDialog,
            handleItemSelect,
            handleOpenDialog,
            handleSearchOptionChange,
            setLoading,
            setSearchTerm,

            currentScreen,
            loading,
            openDialog,
            productType,
            searchOption,
            searchTerm,
            selectedBrand,
            selectedCarModel,
            selectedProduct
        }}>
            {children}
        </ProductsContext.Provider>
    );
};
