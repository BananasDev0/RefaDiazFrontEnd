import { createContext, useContext, useState } from 'react';
import { SearchOptions } from './ProductsConstants';

const SearchContext = createContext();

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
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
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};