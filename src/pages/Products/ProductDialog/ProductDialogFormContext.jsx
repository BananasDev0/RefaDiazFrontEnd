import { createContext, useContext, useEffect, useState } from 'react';
import { useProductSelectionContext } from '../ProductSelectionContext';
import { useSnackbar } from '../../../components/SnackbarContext';
import { createProduct, getProductById, updateProduct } from '../../../services/ProductService';
import Product from '../../../models/Product';
import { ProductTypes } from '../ProductsConstants';
import { useProductDialogContext } from '../ProductDialogContext';
import EventBus from '../../../services/EventBus';
import { DIALOG_EVENTS } from '../ProductDialogContext';
import { useProductDialogImage } from './ProductDialogImageContext';
import { ProductImageService } from '../../../services/ProductImageService';

const ProductDialogFormContext = createContext();

export const useProductDialogForm = () => useContext(ProductDialogFormContext);

export const ProductDialogFormProvider = ({ children }) => {
    const [product, setProduct] = useState(new Product({}));
    const [isLoading, setIsLoading] = useState(false);
    
    const { productType, selectedProduct, setSelectedProduct } = useProductSelectionContext();
    const { mode, closeDialog} = useProductDialogContext();
    const { openSnackbar } = useSnackbar();
    const { uploadProductImages } = useProductDialogImage();

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
                if (productFullInfo.files && productFullInfo.files.length > 0) {
                    productFullInfo.files = await ProductImageService.loadProductImages(productFullInfo.files);
                }
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

            // Subir imágenes primero y obtener las URLs actualizadas
            let updatedFiles = [];
            if (product.files && product.files.length > 0) {
                const uploadedFiles = await uploadProductImages(product.files);
                updatedFiles = uploadedFiles.map(file => ({
                    ...file,
                    fileData: null // Removemos el fileData para no enviarlo al servidor
                }));
            }

            const productToSave = {
                ...product,
                productTypeId: productType,
                files: updatedFiles
            };

            if (product.id) {
                await updateProduct(productToSave.id, productToSave);
            } else {
                await createProduct(productToSave);
            }

            setIsLoading(false);
            closeDialog();
            openSnackbar('Producto procesado correctamente', 'success');
        } catch (error) {
            setIsLoading(false);
            console.error('Error al procesar el producto:', error);
            openSnackbar(`Error al procesar el producto: ${error.message || error.errorMessage}`, 'error');
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