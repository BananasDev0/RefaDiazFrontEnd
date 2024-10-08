import { createContext, useContext, useEffect, useState } from 'react';
import { useProductsContext } from '../ProductsContext';
import { getBase64ImgFromURL, getImageURLFromStorage, uploadImageToStorage } from '../../../services/Firebase/storage';
import { base64ToBlob, getMimeType, modifyAndClone } from '../../../util/generalUtils';
import File from '../../../models/File';
import { createProduct, getProductById, updateProduct } from '../../../services/ProductService';
import { useSnackbar } from '../../../components/SnackbarContext';
import Product from '../../../models/Product';
import { FileTypes, ProductTypes } from '../ProductsConstants';
import { v4 } from 'uuid';

const ProductDialogContext = createContext();

export const useProductDialogContext = () => useContext(ProductDialogContext);

export const ProductDialogProvider = ({ children }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [isNextEnabled, setIsNextEnabled] = useState(false);
    const [product, setProduct] = useState(new Product({}));
    const { productType, handleCloseDialog, selectedProduct, handleOpenDialog, setSelectedProduct } = useProductsContext();
    const dependencies = [productType, product.carModels,
        product.prices, product.stockCount, product.comments, product.dpi];
    const [isLoading, setIsLoading] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const { openSnackbar } = useSnackbar();

    useEffect(() => {
        const fetchData = async () => {
            if (selectedProduct) {
                setIsLoading(true);
                handleOpenDialog();

                let productFullInfo = await getProductById(selectedProduct.id);
                let imagePromises = productFullInfo.files.map(async (file) => {
                    let url = await getImageURLFromStorage(file.storagePath);
                    file.fileData = await getBase64ImgFromURL(url);
                    return file;
                });
                await Promise.all(imagePromises);

                setProduct(productFullInfo);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [selectedProduct]);

    const resetState = () => {
        setSelectedProduct(null);
        setIsEditable(false);
        setActiveStep(0);
        setProduct(new Product({}));
    };

    const handleSetProduct = (newProduct) => {
        setProduct(new Product(newProduct));
    };

    const handleImageUpload = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            let orderId = product.files.length + 1;
            let newFile = new File({ fileData: reader.result, orderId, fileTypeId: FileTypes.PRODUCT_IMAGE });
            newFile = getFileInfo(newFile);
            setProduct(modifyAndClone(product, 'files', [...product.files, newFile]));
        };
        reader.readAsDataURL(file);
    };

    const handleImageDelete = (index) => {
        setProduct(modifyAndClone(product, 'files', product.files.filter((_, i) => i !== index)));
    };

    useEffect(() => {
        const formattedName = formatProductName(productType, product);
        setProduct({ ...product, name: formattedName });
    }, dependencies);


    const formatProductName = (productType, product) => {
        switch (productType) {
            case ProductTypes.RADIATOR:
                return `${product.dpi} ${product.carModels.map(cm => `${cm.carModel.name} (${cm.initialYear}-${cm.lastYear})`).join('-')} [${product.stockCount}]`;
            default:
                return product.name; // Devuelve el nombre existente si el tipo de producto no coincide
        }
    };


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);

            if (product.id) {
                console.log(product)
                const productToUpdate = {
                    ...product,
                    productTypeId: productType,
                    files: product.files.map(file => ({ ...file, fileData: null }))
                };
                product.files.forEach((file) => {
                    if (!file.id) {
                        uploadImageToStorage(base64ToBlob(file.fileData), file.storagePath);
                    }
                });
                await updateProduct(productToUpdate.id, productToUpdate);
            } else {
                const productToCreate = {
                    ...product,
                    productTypeId: productType,
                    files: product.files.map(file => ({ ...file, fileData: null }))
                };

                await createProduct(productToCreate);

                product.files.forEach((file) => {
                    uploadImageToStorage(base64ToBlob(file.fileData), file.storagePath);
                });
            }

            setIsLoading(false);
            handleCloseDialog();
            resetState();
            openSnackbar('Producto procesado correctamente', 'success');
        } catch (error) {
            setIsLoading(false);
            console.log(error)
            openSnackbar(`Error al procesar el producto: ${error.errorMessage}`, 'error');
        }
    }

    const getFileInfo = (file) => {
        let uuid = v4();
        let filename = `/products/images/${uuid}`;
        return {
            ...file,
            mimeType: getMimeType(file.fileData),
            name: uuid,
            storagePath: filename
        };
    }

    return (
        <ProductDialogContext.Provider value={{
            activeStep,
            isLoading,
            isNextEnabled,
            product,
            totalSteps: 3,
            isEditable,

            handleBack,
            handleImageDelete,
            handleImageUpload,
            handleNext,
            handleSetProduct,
            handleSubmit,
            resetState,
            setActiveStep,
            setIsNextEnabled,
            setIsEditable
        }}>
            {children}
        </ProductDialogContext.Provider>

    );
};
