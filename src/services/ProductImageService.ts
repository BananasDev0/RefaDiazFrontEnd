import { supabase } from './supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import type { File as AppFile } from '../types/common.types';

const BUCKET_NAME = 'products'; // Asegúrate de que este es el nombre de tu bucket

export const ProductImageService = {
  /**
   * Sube los archivos nuevos (que tienen `nativeFile`) a Supabase Storage.
   * @param files - El array de archivos del formulario.
   * @returns Un nuevo array de archivos con `storagePath` para todos.
   */
  async uploadFiles(files: AppFile[]): Promise<Partial<AppFile>[]> {
    const uploadPromises = files.map(async (file, index): Promise<Partial<AppFile> | null> => {
      // Si el archivo ya tiene un ID, significa que ya existe en el servidor.
      // Solo devolvemos los datos necesarios para la relación, actualizando el orden.
      if (file.id) {
        return {
          id: file.id,
          name: file.name,
          mimeType: file.mimeType,
          storagePath: file.storagePath,
          orderId: index + 1,
          fileTypeId: file.fileTypeId,
        };
      }

      // Si no tiene `nativeFile`, es un archivo inválido o ya procesado.
      if (!file.nativeFile) {
        // Si tiene storagePath, es probable que venga de una carga previa fallida, lo re-incluimos.
        if (file.storagePath) {
          return { ...file, orderId: index + 1 };
        }
        console.warn('Archivo sin `nativeFile` encontrado, omitiendo subida:', file);
        return null;
      }

      const fileExtension = file.nativeFile.name.split('.').pop();
      const newFileName = `${uuidv4()}.${fileExtension}`;
      const filePath = `images/${newFileName}`; // ej: images/uuid-aleatorio.png

      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file.nativeFile);

      if (error) {
        throw new Error(`Error al subir el archivo ${file.name}: ${error.message}`);
      }

      // Devolvemos el objeto de archivo listo para la base de datos
      return {
        name: newFileName,
        mimeType: file.nativeFile.type,
        storagePath: `${BUCKET_NAME}/${filePath}`, // ej: products/images/uuid.png
        orderId: index + 1,
        fileTypeId: file.fileTypeId,
      };
    });

    const results = await Promise.all(uploadPromises);
    
    // Con los tipos explícitos en el map, este predicado de tipo ahora funciona correctamente.
    return results.filter((file): file is Partial<AppFile> => file !== null);
  },
};