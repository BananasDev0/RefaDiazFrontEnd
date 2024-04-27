import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { app } from './firebase';

const storage = getStorage(app);

export const getImageURLFromStorage = async (path) => {
  const imageRef = ref(storage, path);
  
  try {
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error("Error al obtener la imagen:", error);
    throw new Error("Error al obtener la imagen del storage");
  }
}

export const uploadImageToStorage = async (file, path) => {
  const imageRef = ref(storage, path);
  try {
    await uploadBytes(imageRef, file);
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    throw new Error("Error al subir la imagen al storage");
  }
}