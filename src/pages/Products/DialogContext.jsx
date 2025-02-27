// src/pages/Products/DialogContext.jsx
import { createContext, useContext, useState } from 'react';

const DialogContext = createContext();

export const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialogContext must be used within a DialogProvider');
  }
  return context;
};

export const DialogProvider = ({ children }) => {
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
    <DialogContext.Provider value={{ isOpen, mode, productId, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
};