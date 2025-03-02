import { createContext, useContext, useEffect, useState } from 'react';
import { useProductSelectionContext } from '../ProductSelectionContext';
import { useSnackbar } from '../../../components/SnackbarContext';
import { createProduct, getProductById, updateProduct } from '../../../services/ProductService';
import Product from '../../../models/Product';
import { ProductTypes } from '../ProductsConstants';

const ProductDialogFormContext = createContext();

export const useProductDialogForm = () => useContext(ProductDialogFormContext);

export const ProductDialogFormProvider = ({ children }) => {
    const [product, setProduct] = useState(new Product({}));
    const [isLoading, setIsLoading] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    
    const { productType, handleCloseDialog, selectedProduct, handleOpenDialog, setSelectedProduct } = useProductSelectionContext();
    const { openSnackbar } = useSnackbar();

    const dependencies = [
        productType, 
        product.carModels,
        product.prices, 
        product.stockCount, 
        product.comments, 
        product.dpi
    ];

    useEffect(() => {
        const fetchData = async () => {
            if (selectedProduct) {
                setIsLoading(true);
                handleOpenDialog();

                let productFullInfo = await getProductById(selectedProduct.id);
                setProduct(productFullInfo);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [selectedProduct]);

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

    const handleSetProduct = (newProduct) => {
        setProduct(new Product(newProduct));
    };

    const resetForm = () => {
        setSelectedProduct(null);
        setIsEditable(false);
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
            handleCloseDialog();
            resetForm();
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
            isEditable,
            handleSetProduct,
            handleSubmit,
            resetForm,
            setIsEditable,
            setProduct
        }}>
            {children}
        </ProductDialogFormContext.Provider>
    );
}; 