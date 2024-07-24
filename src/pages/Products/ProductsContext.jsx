import { createContext, useContext, useState, useCallback } from 'react';
import { Screens, SearchOptions } from './ProductsConstants';

const ProductsContext = createContext();

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProductsContext must be used within a ProductsProvider');
  }
  return context;
};

export const ProductsProvider = ({ children }) => {
  const [productType, setProductType] = useState(null);
  const [currentScreen, setCurrentScreen] = useState(Screens.BRANDS);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCarModel, setSelectedCarModel] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState(SearchOptions.BRANDS);
  const [loading, setLoading] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const navigateBack = useCallback(() => {
    if (openDialog) {
      setOpenDialog(false);
      return;
    }
    switch (currentScreen) {
      case Screens.PRODUCTS:
        setCurrentScreen(Screens.MODELS);
        setSelectedCarModel(null);
        setSearchOption(SearchOptions.MODELS);
        break;
      case Screens.MODELS:
        setCurrentScreen(Screens.BRANDS);
        setSearchOption(SearchOptions.BRANDS);
        setSelectedBrand(null);
        break;
      default:
        break;
    }
  }, [currentScreen, openDialog]);

  const resetState = () => {
    setCurrentScreen(Screens.BRANDS);
    setOpenDialog(false);
    setSelectedBrand(null);
    setSelectedCarModel(null);
    setSearchTerm('');
    setSearchOption(SearchOptions.BRANDS);
    setLoading(false);
    setScrollPosition(0);
  }

  const handleItemSelect = (item, type) => {
    switch (type) {
      case Screens.BRANDS:
        setSelectedBrand(item);
        setSearchOption(SearchOptions.MODELS);
        setCurrentScreen(Screens.MODELS);
        break;
      case Screens.MODELS:
        setSelectedCarModel(item);
        setSearchOption(SearchOptions.PRODUCTS);
        setCurrentScreen(Screens.PRODUCTS);
        break;
      case Screens.PRODUCTS:
        setSelectedProduct(item);
        setScrollPosition(window.pageYOffset);
        break;
      default:
        console.log('Tipo de selección no reconocido:', type);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangeProductType = (newValue) => {
    setProductType(newValue);
  };

  const handleSearchOptionChange = (value) => {
    setSearchTerm('');
    setSearchOption(value);
    resetState();
    if (value === SearchOptions.BRANDS) {
      setCurrentScreen(Screens.BRANDS);
    } else if (value === SearchOptions.MODELS) {
      setCurrentScreen(Screens.MODELS);
    } else {
      setCurrentScreen(Screens.PRODUCTS);
    }
  };

  const value = {
    productType,
    currentScreen,
    openDialog,
    selectedProduct,
    selectedBrand,
    selectedCarModel,
    searchTerm,
    searchOption,
    loading,
    scrollPosition,
    setProductType,
    setCurrentScreen,
    setOpenDialog,
    setSelectedProduct,
    setSelectedBrand,
    setSelectedCarModel,
    setSearchTerm,
    setSearchOption,
    setLoading,
    setScrollPosition,
    handleItemSelect,
    handleOpenDialog,
    handleCloseDialog,
    handleChangeProductType,
    handleSearchOptionChange,
    navigateBack
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};