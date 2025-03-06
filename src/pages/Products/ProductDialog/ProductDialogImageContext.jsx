import { createContext, useContext } from 'react';
import { StorageAdapter } from '../../../services/StorageAdapter';
import { getMimeType, modifyAndClone } from '../../../util/generalUtils';
import File from '../../../models/File';
import { FileTypes } from '../ProductsConstants';
import { v4 } from 'uuid';
import { useProductDialogForm } from './ProductDialogFormContext';

const ProductDialogImageContext = createContext();

export const useProductDialogImage = () => useContext(ProductDialogImageContext);

export const ProductDialogImageProvider = ({ children }) => {
    const { product, setProduct } = useProductDialogForm();

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

    const getFileInfo = (file) => {
        let uuid = v4();
        let filename = `/products/images/${uuid}`;
        return {
            ...file,
            mimeType: getMimeType(file.fileData),
            name: uuid,
            storagePath: filename
        };
    };

    const loadProductImages = async (productFiles) => {
        let imagePromises = productFiles.map(async (file) => {
            let url = await StorageAdapter.getFileURL(file.storagePath);
            file.fileData = await StorageAdapter.getBase64FromURL(url);
            return file;
        });
        return Promise.all(imagePromises);
    };

    const uploadProductImages = (files) => {
        files.forEach((file) => {
            if (!file.id) {
                StorageAdapter.uploadFile(StorageAdapter.base64ToBlob(file.fileData), file.storagePath);
            }
        });
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