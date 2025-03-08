// src/pages/Products/ProductDialogContext.jsx
import { createContext, useContext, useState } from 'react';
import EventBus from '../../services/EventBus';

// Constantes para los eventos
export const DIALOG_EVENTS = {
  CLOSE: 'dialog:close'
};

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
    
    // Emitir evento de cierre para que otros componentes puedan reaccionar
    EventBus.emit(DIALOG_EVENTS.CLOSE);
  };

  return (
    <ProductDialogContext.Provider value={{ isOpen, mode, productId, openDialog, closeDialog, setMode }}>
      {children}
    </ProductDialogContext.Provider>
  );
};