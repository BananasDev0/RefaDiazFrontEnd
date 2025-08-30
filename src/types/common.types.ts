// src/types/common.types.ts

/**
 * Representa un archivo almacenado, como una imagen o documento.
 * Utilizado por Productos, Marcas, etc.
 */
export interface File {
  id?: number;
  name: string;
  mimeType: string;
  storagePath: string;
  orderId: number;
  fileData?: string | null; // Base64 para el frontend
  fileTypeId: number;
  nativeFile?: globalThis.File; // Para manejar nuevos archivos seleccionados por el usuario
}