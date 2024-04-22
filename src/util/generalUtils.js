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