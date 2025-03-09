import { createContext, useContext, useState } from 'react';

const ProductLoadingContext = createContext();

export const useProductLoadingContext = () => {
  const context = useContext(ProductLoadingContext);
  if (context === undefined) {
    throw new Error('useProductLoadingContext must be used within a ProductLoadingProvider');
  }
  return context;
};

export const ProductLoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const value = {
    loading,
    setLoading,
  };

  return (
    <ProductLoadingContext.Provider value={value}>
      {children}
    </ProductLoadingContext.Provider>
  );
};