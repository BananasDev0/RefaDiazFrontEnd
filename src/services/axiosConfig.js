import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_REFA_BASE_PATH,  // Cambia esto por la URL base de tu API
  // Configuraciones adicionales si es necesario
});

// Interceptor para agregar el token de autenticación
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    // Manejo exitoso de la respuesta
    return {
      errorMessage: '',
      statusCode: response.status,
      response: response.data
    };
  },
  error => {
    // Inicializa valores predeterminados para el objeto de error
    let errorMessage = 'Ocurrió un error inesperado';
    let statusCode = error.response ? error.response.status : 500;

    // Personaliza el mensaje de error basado en el código de estado HTTP
    if (error.response) {
      switch (error.response.status) {
        case 400:
          errorMessage = 'Solicitud incorrecta.';
          break;
        case 401:
          errorMessage = 'No autorizado. Por favor, inicia sesión de nuevo.';
          break;
        case 404:
          errorMessage = 'El recurso solicitado no fue encontrado.';
          break;
        case 500:
          errorMessage = 'Error interno del servidor.';
          break;
        default:
          errorMessage = error.response.data.message || errorMessage;
      }
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      errorMessage = 'No se recibió respuesta del servidor.';
    } else {
      // Algo sucedió en la configuración de la solicitud que desencadenó un error
      errorMessage = error.message;
    }

    // Regresa un objeto estructurado con detalles del error
    return Promise.reject({
      errorMessage,
      statusCode,
      response: error.response ? error.response.data : null
    });
  }
);

export default axiosInstance;
