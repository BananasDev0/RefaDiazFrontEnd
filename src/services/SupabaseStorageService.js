import { supabase } from './supabaseClient';
import { v4 as uuidv4 } from 'uuid';

/**
 * Clase que proporciona métodos para interactuar con el almacenamiento de Supabase
 */
export class SupabaseStorageService {
  /**
   * Sube un archivo al almacenamiento de Supabase
   * @param {File|Blob} file - El archivo a subir
   * @param {string} bucket - El nombre del bucket donde se almacenará el archivo
   * @param {string} path - La ruta dentro del bucket (opcional)
   * @param {string} fileName - El nombre del archivo (opcional, si no se proporciona se generará uno)
   * @returns {Promise<{path: string, url: string}>} - La ruta del archivo y la URL pública
   */
  static async uploadFile(file, bucket, path = '', fileName = '') {
    try {
      // Si no se proporciona un nombre de archivo, generamos uno único
      const finalFileName = fileName || `${uuidv4()}`;
      
      // Construimos la ruta completa
      const filePath = path ? `${path}/${finalFileName}` : finalFileName;
      
      // Subimos el archivo a Supabase Storage
      const { error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });
      
      if (error) {
        console.error('Error al subir el archivo:', error);
        throw new Error(`Error al subir el archivo: ${error.message}`);
      }
      
      // Obtenemos la URL pública del archivo
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);
      
      return {
        path: filePath,
        url: urlData.publicUrl
      };
    } catch (error) {
      console.error('Error en uploadFile:', error);
      throw error;
    }
  }

  /**
   * Obtiene la URL pública de un archivo almacenado en Supabase
   * @param {string} bucket - El nombre del bucket
   * @param {string} path - La ruta del archivo dentro del bucket
   * @returns {Promise<string>} - La URL pública del archivo
   */
  static getPublicUrl(bucket, path) {
    try {
      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(path);
      
      return data.publicUrl;
    } catch (error) {
      console.error('Error al obtener la URL pública:', error);
      throw new Error(`Error al obtener la URL pública: ${error.message}`);
    }
  }

  /**
   * Descarga un archivo de Supabase Storage
   * @param {string} bucket - El nombre del bucket
   * @param {string} path - La ruta del archivo dentro del bucket
   * @returns {Promise<Blob>} - El archivo como un Blob
   */
  static async downloadFile(bucket, path) {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .download(path);
      
      if (error) {
        console.error('Error al descargar el archivo:', error);
        throw new Error(`Error al descargar el archivo: ${error.message}`);
      }
      
      return data;
    } catch (error) {
      console.error('Error en downloadFile:', error);
      throw error;
    }
  }

  /**
   * Elimina un archivo de Supabase Storage
   * @param {string} bucket - El nombre del bucket
   * @param {string} path - La ruta del archivo dentro del bucket
   * @returns {Promise<void>}
   */
  static async deleteFile(bucket, path) {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path]);
      
      if (error) {
        console.error('Error al eliminar el archivo:', error);
        throw new Error(`Error al eliminar el archivo: ${error.message}`);
      }
    } catch (error) {
      console.error('Error en deleteFile:', error);
      throw error;
    }
  }

  /**
   * Convierte un archivo base64 a Blob para subirlo a Supabase
   * @param {string} base64Data - Los datos del archivo en formato base64
   * @returns {Blob} - El archivo como un Blob
   */
  static base64ToBlob(base64Data) {
    try {
      // Extraer el tipo MIME y los datos
      const [metaData, base64] = base64Data.split(',');
      const mimeType = metaData.match(/:(.*?);/)[1];
      
      // Convertir base64 a array de bytes
      const byteCharacters = atob(base64);
      const byteArrays = [];
      
      for (let i = 0; i < byteCharacters.length; i += 512) {
        const slice = byteCharacters.slice(i, i + 512);
        
        const byteNumbers = new Array(slice.length);
        for (let j = 0; j < slice.length; j++) {
          byteNumbers[j] = slice.charCodeAt(j);
        }
        
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
      
      return new Blob(byteArrays, { type: mimeType });
    } catch (error) {
      console.error('Error al convertir base64 a Blob:', error);
      throw new Error(`Error al convertir base64 a Blob: ${error.message}`);
    }
  }

  /**
   * Convierte un Blob a base64
   * @param {Blob} blob - El archivo como un Blob
   * @returns {Promise<string>} - Los datos del archivo en formato base64
   */
  static async blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
    });
  }
} 