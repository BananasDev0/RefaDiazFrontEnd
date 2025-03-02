// src/pages/Products/ProductDialogContext.jsx
import { createContext, useContext, useState } from 'react';

const ProductDialogContext = createContext();

export const useProductDialogContext = () => {
  const context = useContext(ProductDialogContext);
  if (!context) {
    throw new Error('useProductDialogContext must be used within a ProductDialogProvider');
  }
  return context;
};

export const ProductDialogProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState(null); // 'create', 'edit', 'view'
  const [productId, setProductId] = useState(null);

  const openDialog = (mode, productId = null) => {
    setMode(mode);
    setProductId(productId);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setMode(null);
    setProductId(null);
  };

  return (
    <ProductDialogContext.Provider value={{ isOpen, mode, productId, openDialog, closeDialog }}>
      {children}
    </ProductDialogContext.Provider>
  );
};