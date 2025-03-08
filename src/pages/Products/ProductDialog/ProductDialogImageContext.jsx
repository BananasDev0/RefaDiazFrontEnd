import { createContext, useContext } from 'react';
import { ProductImageService } from '../../../services/ProductImageService';
import { modifyAndClone } from '../../../util/generalUtils';

const ProductDialogImageContext = createContext();

export const useProductDialogImage = () => useContext(ProductDialogImageContext);

export const ProductDialogImageProvider = ({ children }) => {
    const handleImageUpload = (file, product, setProduct) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            let orderId = product.files.length + 1;
            let newFile = ProductImageService.createFileFromUpload(reader.result, orderId);
            setProduct(modifyAndClone(product, 'files', [...product.files, newFile]));
        };
        reader.readAsDataURL(file);
    };

    const handleImageDelete = (index, product, setProduct) => {
        setProduct(modifyAndClone(product, 'files', product.files.filter((_, i) => i !== index)));
    };

    const loadProductImages = async (productFiles) => {
        return ProductImageService.loadProductImages(productFiles);
    };

    const uploadProductImages = async (files) => {
        return ProductImageService.uploadProductImages(files);
    };

    return (
        <ProductDialogImageContext.Provider value={{
            handleImageUpload,
            handleImageDelete,
            loadProductImages,
            uploadProductImages
        }}>
            {children}
        </ProductDialogImageContext.Provider>
    );
}; 