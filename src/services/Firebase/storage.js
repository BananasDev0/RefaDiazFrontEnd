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

export const getBase64ImgFromURL = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const base64String = await convertBlobToBase64(blob);
  return base64String;
}

const convertBlobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64String = reader.result;
      resolve(base64String);
    };
    reader.onerror = reject;
  });
}