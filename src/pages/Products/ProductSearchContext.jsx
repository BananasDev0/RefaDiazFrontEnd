import { createContext, useContext, useState } from 'react';
import { SearchOptions } from './ProductsConstants';

const ProductSearchContext = createContext();

export const useProductSearchContext = () => {
  const context = useContext(ProductSearchContext);
  if (context === undefined) {
    throw new Error('useProductSearchContext must be used within a ProductSearchProvider');
  }
  return context;
};

export const ProductSearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState(SearchOptions.BRANDS);

  const handleSearchOptionChange = (value) => {
    setSearchTerm('');
    setSearchOption(value);
  };

  const value = {
    searchTerm,
    searchOption,
    setSearchTerm,
    setSearchOption,
    handleSearchOptionChange,
  };

  return (
    <ProductSearchContext.Provider value={value}>
      {children}
    </ProductSearchContext.Provider>
  );
};