export function modifyAndClone(obj, path, value) {
  // Realiza una clonación profunda del objeto original
  const clone = JSON.parse(JSON.stringify(obj));

  // Divide el camino en claves individuales
  const keys = path.split('.');
  let current = clone;

  // Recorre todas las claves excepto la última
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];

    // Si la clave no existe o no es un objeto, crea un objeto vacío
    if (current[key] === undefined || typeof current[key] !== 'object') {
      current[key] = {};
    }

    // Mueve 'current' al siguiente objeto anidado
    current = current[key];
  }

  // Establece el valor en la última clave
  current[keys[keys.length - 1]] = value;

  // Retorna el objeto clonado modificado
  return clone;
}

export function getMimeType(base64String) {
  // Encuentra el patrón MIME en la cadena Base64
  const matches = base64String.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/);

  if (matches && matches.length > 1) {
      return matches[1];  // Devuelve el tipo MIME si se encuentra
  }
  return null; // Retorna null si no hay coincidencias
}

export const base64ToBlob = (base64) => {
  let mimeType = getMimeType(base64);
  // Decodifica la cadena base64
  const byteCharacters = atob(base64.split(',')[1]); // Asegúrate de separar el prefijo del tipo MIME si está presente

  // Genera un array de bytes
  const byteArrays = [];

  // Tamaño del chunk a cortar y convertir
  const sliceSize = 512;

  // Corta la cadena en piezas y convierte en un array de bytes
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  // Crea el Blob a partir del array de bytes
  const blob = new Blob(byteArrays, { type: mimeType });
  return blob;
}

export const extractMainTitle = (title) => {
  const match = title.match(/^[^()]+/);
  return match ? match[0].trim() : title;
};

export const getBase64ImageDimensions = (base64String) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = reject;
    img.src = base64String;
  });
};