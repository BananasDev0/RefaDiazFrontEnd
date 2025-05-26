import axios, { type AxiosResponse, AxiosError } from 'axios';

// Crear instancia de Axios con baseURL desde variables de entorno
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_REFA_BASE_PATH,
  timeout: 10000, // 10 segundos de timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de solicitud para añadir token JWT
axiosInstance.interceptors.request.use(
  (config) => {
    // Obtener token JWT del localStorage
    const token = localStorage.getItem('authToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuesta para manejo de errores y datos
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Si la respuesta es exitosa (2xx), devolver response.data
    return response.data;
  },
  (error: AxiosError) => {
    let mensajeFormateado = 'Error desconocido';
    let statusCode = 0;
    
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      statusCode = error.response.status;
      const errorData = error.response.data as { message?: string; error?: string };
      
      // Manejar específicamente el error 401
      if (statusCode === 401) {
        // Limpiar sesión en caso de error 401 (no autorizado)
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        
        // Opcional: redirigir al login
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        
        mensajeFormateado = 'Sesión expirada. Por favor, inicia sesión nuevamente.';
      } else {
        // Formatear mensaje de error para otros códigos de estado
        if (errorData?.message) {
          mensajeFormateado = errorData.message;
        } else if (errorData?.error) {
          mensajeFormateado = errorData.error;
        } else {
          switch (statusCode) {
            case 400:
              mensajeFormateado = 'Solicitud incorrecta. Verifica los datos enviados.';
              break;
            case 403:
              mensajeFormateado = 'No tienes permisos para realizar esta acción.';
              break;
            case 404:
              mensajeFormateado = 'Recurso no encontrado.';
              break;
            case 422:
              mensajeFormateado = 'Datos de entrada inválidos.';
              break;
            case 500:
              mensajeFormateado = 'Error interno del servidor. Intenta más tarde.';
              break;
            default:
              mensajeFormateado = `Error del servidor (${statusCode})`;
          }
        }
      }
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      mensajeFormateado = 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
    } else {
      // Algo pasó al configurar la solicitud
      mensajeFormateado = error.message || 'Error al procesar la solicitud';
    }
    
    // Crear nuevo error con información adicional
    const customError = new Error(mensajeFormateado) as Error & {
      statusCode: number;
      originalError: AxiosError;
    };
    customError.statusCode = statusCode;
    customError.originalError = error;
    
    return Promise.reject(customError);
  }
);

export default axiosInstance; 