import { createContext, useContext, useEffect, useState } from 'react';
import { useProductSelectionContext } from '../ProductSelectionContext';
import { useSnackbar } from '../../../components/SnackbarContext';
import { createProduct, getProductById, updateProduct } from '../../../services/ProductService';
import Product from '../../../models/Product';
import { ProductTypes } from '../ProductsConstants';
import { useProductDialogContext } from '../ProductDialogContext';
import EventBus from '../../../services/EventBus';
import { DIALOG_EVENTS } from '../ProductDialogContext';

const ProductDialogFormContext = createContext();

export const useProductDialogForm = () => useContext(ProductDialogFormContext);

export const ProductDialogFormProvider = ({ children }) => {
    const [product, setProduct] = useState(new Product({}));
    const [isLoading, setIsLoading] = useState(false);
    
    const { productType, selectedProduct, setSelectedProduct } = useProductSelectionContext();
    const { mode, closeDialog} = useProductDialogContext();
    const { openSnackbar } = useSnackbar();

    const dependencies = [
        productType, 
        product.carModels,
        product.prices, 
        product.stockCount, 
        product.comments, 
        product.dpi
    ];

    // Escuchar el evento de cierre del diálogo
    useEffect(() => {
        // Suscribirse al evento de cierre
        const unsubscribe = EventBus.on(DIALOG_EVENTS.CLOSE, () => {
            resetForm();
        });
        
        // Limpiar la suscripción al desmontar
        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (selectedProduct) {
                setIsLoading(true);
                
                let productFullInfo = await getProductById(selectedProduct.id);
                setProduct(productFullInfo);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [selectedProduct, mode]);

    useEffect(() => {
        const formattedName = formatProductName(productType, product);
        setProduct({ ...product, name: formattedName });
    }, dependencies);

    const formatProductName = (productType, product) => {
        switch (productType) {
            case ProductTypes.RADIATOR:
                return `${product.dpi} ${product.carModels.map(cm => `${cm.carModel.name} (${cm.initialYear}-${cm.lastYear})`).join('-')} [${product.stockCount}]`;
            default:
                return product.name;
        }
    };

    const resetForm = () => {
        setSelectedProduct(null);
        setProduct(new Product({}));
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);

            if (product.id) {
                const productToUpdate = {
                    ...product,
                    productTypeId: productType,
                    files: product.files.map(file => ({ ...file, fileData: null }))
                };
                await updateProduct(productToUpdate.id, productToUpdate);
            } else {
                const productToCreate = {
                    ...product,
                    productTypeId: productType,
                    files: product.files.map(file => ({ ...file, fileData: null }))
                };
                await createProduct(productToCreate);
            }

            setIsLoading(false);
            closeDialog();
            openSnackbar('Producto procesado correctamente', 'success');
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            openSnackbar(`Error al procesar el producto: ${error.errorMessage}`, 'error');
        }
    };

    return (
        <ProductDialogFormContext.Provider value={{
            product,
            isLoading,
            handleSubmit,
            resetForm,
            setProduct
        }}>
            {children}
        </ProductDialogFormContext.Provider>
    );
}; 