import { SupabaseStorageService } from './SupabaseStorageService';
import { getImageURLFromStorage, uploadImageToStorage, getBase64ImgFromURL } from './Firebase/storage';
import { SUPABASE_BUCKETS, SUPABASE_PATHS } from '../constants/supabaseConfig';

/**
 * Adaptador para el almacenamiento de archivos
 * Proporciona una interfaz común para interactuar con diferentes servicios de almacenamiento
 * Actualmente soporta Firebase Storage y Supabase Storage
 */
export class StorageAdapter {
  // Constantes para identificar el proveedor de almacenamiento
  static PROVIDER = {
    FIREBASE: 'firebase',
    SUPABASE: 'supabase'
  };

  // Proveedor de almacenamiento actual (por defecto Firebase para mantener compatibilidad)
  static currentProvider = StorageAdapter.PROVIDER.FIREBASE;

  // Configuración de buckets para Supabase
  static BUCKETS = SUPABASE_BUCKETS;
  
  // Configuración de rutas dentro de los buckets
  static PATHS = SUPABASE_PATHS;

  /**
   * Cambia el proveedor de almacenamiento actual
   * @param {string} provider - El proveedor a utilizar (StorageAdapter.PROVIDER.FIREBASE o StorageAdapter.PROVIDER.SUPABASE)
   */
  static setProvider(provider) {
    if (Object.values(StorageAdapter.PROVIDER).includes(provider)) {
      StorageAdapter.currentProvider = provider;
    } else {
      console.error(`Proveedor de almacenamiento no válido: ${provider}`);
    }
  }

  /**
   * Obtiene la URL de un archivo almacenado
   * @param {string} path - La ruta del archivo
   * @returns {Promise<string>} - La URL del archivo
   */
  static async getFileURL(path) {
    try {
      if (StorageAdapter.currentProvider === StorageAdapter.PROVIDER.FIREBASE) {
        // Usar Firebase Storage
        return await getImageURLFromStorage(path);
      } else {
        // Usar Supabase Storage
        // Extraer el bucket y la ruta del archivo de la ruta completa
        const [bucket, ...pathParts] = path.split('/').filter(part => part);
        const filePath = pathParts.join('/');
        
        return SupabaseStorageService.getPublicUrl(bucket, filePath);
      }
    } catch (error) {
      console.error('Error al obtener la URL del archivo:', error);
      throw error;
    }
  }

  /**
   * Sube un archivo al almacenamiento
   * @param {File|Blob} file - El archivo a subir
   * @param {string} path - La ruta donde se almacenará el archivo
   * @returns {Promise<{path: string, url: string}>} - La ruta del archivo y la URL pública
   */
  static async uploadFile(file, path) {
    try {
      if (StorageAdapter.currentProvider === StorageAdapter.PROVIDER.FIREBASE) {
        // Usar Firebase Storage
        await uploadImageToStorage(file, path);
        const url = await getImageURLFromStorage(path);
        return { path, url };
      } else {
        // Usar Supabase Storage
        // Extraer el bucket y la ruta del archivo de la ruta completa
        const [bucket, ...pathParts] = path.split('/').filter(part => part);
        const filePath = pathParts.join('/');
        
        return await SupabaseStorageService.uploadFile(file, bucket, '', filePath);
      }
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      throw error;
    }
  }

  /**
   * Obtiene un archivo en formato base64 a partir de una URL
   * @param {string} url - La URL del archivo
   * @returns {Promise<string>} - El archivo en formato base64
   */
  static async getBase64FromURL(url) {
    try {
      if (StorageAdapter.currentProvider === StorageAdapter.PROVIDER.FIREBASE) {
        // Usar Firebase Storage
        return await getBase64ImgFromURL(url);
      } else {
        // Usar Supabase Storage
        const response = await fetch(url);
        const blob = await response.blob();
        return await SupabaseStorageService.blobToBase64(blob);
      }
    } catch (error) {
      console.error('Error al obtener el archivo en formato base64:', error);
      throw error;
    }
  }

  /**
   * Convierte datos base64 a un Blob
   * @param {string} base64Data - Los datos en formato base64
   * @returns {Blob} - El archivo como un Blob
   */
  static base64ToBlob(base64Data) {
    return SupabaseStorageService.base64ToBlob(base64Data);
  }

  /**
   * Genera una ruta de almacenamiento para un archivo
   * @param {string} type - El tipo de archivo (products, brands, etc.)
   * @param {string} subtype - El subtipo de archivo (images, documents, etc.)
   * @param {string} fileName - El nombre del archivo
   * @returns {string} - La ruta completa del archivo
   */
  static generateStoragePath(type, subtype, fileName) {
    if (StorageAdapter.currentProvider === StorageAdapter.PROVIDER.FIREBASE) {
      // Formato de ruta para Firebase
      return `/${type}/${subtype}/${fileName}`;
    } else {
      // Formato de ruta para Supabase
      return `${type}/${subtype}/${fileName}`;
    }
  }
} 