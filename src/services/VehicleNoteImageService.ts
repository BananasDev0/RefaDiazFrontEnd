import { supabase } from './supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import type { File as AppFile } from '../types/common.types';

const BUCKET_NAME = 'vehicle-notes';

export const VehicleNoteImageService = {
  async uploadFiles(files: AppFile[]): Promise<Partial<AppFile>[]> {
    const uploadPromises = files.map(async (file, index): Promise<Partial<AppFile> | null> => {
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

      if (!file.nativeFile) {
        if (file.storagePath) {
          return { ...file, orderId: index + 1 };
        }

        console.warn('Archivo sin `nativeFile` encontrado, omitiendo subida:', file);
        return null;
      }

      const fileExtension = file.nativeFile.name.split('.').pop();
      const newFileName = `${uuidv4()}.${fileExtension}`;
      const filePath = `images/${newFileName}`;

      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file.nativeFile);

      if (error) {
        throw new Error(`Error al subir el archivo ${file.name}: ${error.message}`);
      }

      return {
        name: newFileName,
        mimeType: file.nativeFile.type,
        storagePath: `${BUCKET_NAME}/${filePath}`,
        orderId: index + 1,
        fileTypeId: file.fileTypeId,
      };
    });

    const results = await Promise.all(uploadPromises);

    return results.filter((file): file is Partial<AppFile> => file !== null);
  },
};
