// src/pages/Products/DialogContext.jsx
import { createContext, useContext, useState } from 'react';
import Product from '../../models/Product'; // Asegúrate de importar el modelo

const DialogContext = createContext();

export const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error('useDialogContext must be used within a DialogProvider');
  }
  return context;
};

export const DialogProvider = ({ children }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [product, setProduct] = useState(new Product({})); // Estado para el producto editado
  const [isEditable, setIsEditable] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleOpenDialog = (productToEdit = null) => {
    setOpenDialog(true);
    if (productToEdit) {
      setSelectedProduct(productToEdit);
      setProduct(new Product(productToEdit)); // Clonar el producto para edición
      setIsEditable(true);
    } else {
      setSelectedProduct(null);
      setProduct(new Product({}));
      setIsEditable(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
    setProduct(new Product({}));
    setIsEditable(false);
    setScrollPosition(0);
  };

  const handleSetProduct = (newProduct) => {
    setProduct(new Product(newProduct));
  };

  const value = {
    openDialog,
    selectedProduct,
    product,
    isEditable,
    scrollPosition,
    setProduct: handleSetProduct,
    handleOpenDialog,
    handleCloseDialog,
    setIsEditable,
  };

  return (
    <DialogContext.Provider value={value}>
      {children}
    </DialogContext.Provider>
  );
};