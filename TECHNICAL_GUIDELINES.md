
# Pautas Técnicas del Proyecto

Este documento describe las pautas técnicas y las convenciones a seguir durante el desarrollo de este proyecto.

## 1. Tecnologías Principales

- **Framework:** React 18
- **Lenguaje:** TypeScript
- **UI Kit:** Material-UI (MUI) v7
- **Enrutamiento:** React Router DOM v6
- **Gestión de Estado:**
  - **Estado del Servidor:** TanStack Query (React Query) v5
  - **Estado Global del Cliente:** Zustand v5
  - **Estado de Formularios:** React Hook Form v7
- **Cliente HTTP:** Axios
- **Validación de Esquemas:** Yup
- **Bundler:** Vite

## 2. Estructura de Directorios

La estructura de `src` está organizada por funcionalidad:

- `api/`: Lógica de llamadas a la API (si es necesario).
- `assets/`: Imágenes, fuentes y otros recursos estáticos.
- `components/`: Componentes de React reutilizables.
  - `common/`: Componentes genéricos (botones, inputs, etc.).
- `constants/`: Constantes de la aplicación.
- `contexts/`: Proveedores de Contexto de React.
- `hooks/`: Hooks personalizados de React.
- `pages/`: Componentes que representan páginas completas.
- `services/`: Servicios (lógica de negocio, llamadas a API, etc.).
- `stores/`: Stores de Zustand.
- `styles/`: Estilos globales o específicos.
- `types/`: Definiciones de tipos de TypeScript.
- `utils/`: Funciones de utilidad.

## 3. Convenciones de Codificación

### General

- **Formato:** Sigue las reglas de ESLint y Prettier configuradas en el proyecto.
- **Nombrado:**
  - **Componentes:** `PascalCase` (ej. `MiComponente.tsx`).
  - **Archivos no componentes:** `camelCase` (ej. `miServicio.ts`).
  - **Variables y funciones:** `camelCase`.
  - **Tipos e interfaces:** `PascalCase` (ej. `type MiTipo = { ... }`).
- **Importaciones:** Organiza las importaciones en el siguiente orden:
  1.  Bibliotecas de terceros (React, MUI, etc.).
  2.  Importaciones absolutas del proyecto (`/src/...`).
  3.  Importaciones relativas (`./`, `../`).

### TypeScript

- **Tipado Estricto:** Utiliza tipos siempre que sea posible. Evita el uso de `any`.
- **Interfaces vs. Types:** Usa `type` para definir los tipos de props, estado y otros objetos. Usa `interface` para definir la forma de objetos que pueden ser extendidos.
- **Nomenclatura de Tipos:** Para los tipos de un componente, defínelos en el mismo archivo del componente o en un archivo `types.ts` dentro del mismo directorio.

### Componentes de React

- **Componentes Funcionales:** Utiliza componentes funcionales con Hooks.
- **Props:** Define las `props` con tipos de TypeScript.
- **Exportaciones:** Usa exportaciones nombradas (`export const MiComponente`) en lugar de exportaciones por defecto (`export default MiComponente`).

## 4. Gestión de Estado

### TanStack Query (React Query)

- **Uso:** Para todas las operaciones de datos asíncronas con el servidor (GET, POST, PUT, DELETE).
- **Claves de Consulta (`queryKey`):** Usa un array de strings descriptivo. Por ejemplo, `['usuarios', 'lista']` o `['usuario', userId]`.
- **Configuración por Defecto:** Las consultas tienen un `staleTime` de 5 minutos.

### Zustand

- **Uso:** Para el estado global del cliente que necesita ser compartido entre componentes no relacionados (ej. estado de autenticación, tema de la UI, etc.).
- **Stores:** Define los stores en el directorio `src/stores`.

### React Hook Form

- **Uso:** Para manejar el estado, la validación y el envío de todos los formularios.
- **Validación:** Usa `yup` para definir los esquemas de validación y conéctalo con `React Hook Form` a través de `@hookform/resolvers/yup`.

## 5. Estilos y UI

- **Material-UI (MUI):** Utiliza los componentes de MUI siempre que sea posible.
- **Estilos:**
  - **`sx` Prop:** Para overrides de estilo puntuales y dinámicos.
  - **Styled Components (`styled()`):** Para crear componentes reutilizables con estilos complejos.
- **Tema:** El tema de la aplicación está definido en `src/theme.ts`. Extiende este tema para nuevos colores, tipografías, etc.

## 6. Llamadas a la API

- **Axios:** Todas las llamadas a la API deben realizarse a través de la instancia de Axios configurada en `src/services/axiosConfig.ts`.
- **Manejo de Errores:** El interceptor de Axios maneja los errores comunes de la API. Los componentes deben estar preparados para recibir y mostrar los mensajes de error.
- **Autenticación:** El interceptor de Axios añade automáticamente el token de autenticación a las cabeceras de las solicitudes.

## 7. Pruebas

*(Sección a definir. Incluir pautas sobre qué probar, cómo nombrar los archivos de prueba y qué bibliotecas usar).*
