/**
 * Servicio de eventos simple para comunicación entre componentes
 * sin crear dependencias circulares
 */
class EventBus {
  constructor() {
    this.events = {};
  }

  /**
   * Suscribe a un evento
   * @param {string} event - Nombre del evento
   * @param {Function} callback - Función a ejecutar cuando ocurra el evento
   * @returns {Function} - Función para cancelar la suscripción
   */
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);

    // Retorna una función para cancelar la suscripción
    return () => {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    };
  }

  /**
   * Emite un evento
   * @param {string} event - Nombre del evento
   * @param {any} data - Datos a pasar a los callbacks
   */
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
}

// Singleton para usar en toda la aplicación
export default new EventBus(); 