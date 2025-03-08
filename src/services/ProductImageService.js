import { StorageAdapter } from './StorageAdapter';
import { v4 } from 'uuid';
import { getMimeType } from '../util/generalUtils';
import File from '../models/File';
import { FileTypes } from '../pages/Products/ProductsConstants';

export class ProductImageService {
    static {
        // Configurar Supabase como proveedor de almacenamiento por defecto
        StorageAdapter.setProvider(StorageAdapter.PROVIDER.SUPABASE);
    }

    static getFileInfo(file) {
        let uuid = v4();
        let filename = `products/images/${uuid}`;
        return {
            ...file,
            mimeType: getMimeType(file.fileData),
            name: uuid,
            storagePath: filename
        };
    }

    static createFileFromUpload(fileData, orderId) {
        let newFile = new File({ 
            fileData, 
            orderId, 
            fileTypeId: FileTypes.PRODUCT_IMAGE 
        });
        return this.getFileInfo(newFile);
    }

    static async loadProductImages(productFiles) {
        let imagePromises = productFiles.map(async (file) => {
            let url = await StorageAdapter.getFileURL(file.storagePath);
            file.fileData = await StorageAdapter.getBase64FromURL(url);
            return file;
        });
        return Promise.all(imagePromises);
    }

    static async uploadProductImages(files) {
        const uploadPromises = files.map(async (file) => {
            if (!file.id) {
                const blob = StorageAdapter.base64ToBlob(file.fileData);
                const result = await StorageAdapter.uploadFile(blob, file.storagePath);
                return { ...file, url: result.url };
            }
            return file;
        });
        return Promise.all(uploadPromises);
    }
} 