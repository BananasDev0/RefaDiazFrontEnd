# AGENTS.MD - Contexto para Asistentes de IA y Desarrolladores

Este documento proporciona el contexto esencial sobre el proyecto "Sistema de Gestión - Radiadores Díaz" para facilitar la asistencia por parte de modelos de IA y la incorporación de nuevos desarrolladores durante la **reimplementación completa del frontend**.

## 1. Visión General del Proyecto

**Nombre del Proyecto:** Sistema de Gestión - Radiadores Díaz (RefaDiaz)

**Objetivo Principal:** Reimplementar desde cero el frontend para digitalizar y optimizar las operaciones de una refaccionaria especializada en sistemas de enfriamiento automotriz. El sistema gestionará inventario, ventas, reparaciones e instalaciones.

**Tecnologías Clave del Frontend (Stack Objetivo):**

*   **Lenguaje:** TypeScript
*   **Framework/Librería UI:** React (con Vite como bundler)
*   **Componentes UI:** Material-UI (MUI) - Se utilizará para construir la interfaz.
*   **Enrutamiento:** React Router DOM v6
*   **Gestión de Estado del Servidor:** TanStack Query (anteriormente React Query) - Para todas las interacciones de datos con el backend.
*   **Gestión de Estado Global del Cliente/UI:** Zustand - Para estado de UI global y compartido.
*   **Llamadas API:** Axios (con una instancia configurada para la URL base y manejo de tokens/errores).
*   **Autenticación y Backend de Soporte:** Supabase (Auth, Database, Storage, Edge Functions).

## 2. Dominio del Negocio (Radiadores Díaz)

*   **Servicios Principales:**
    1.  Venta de piezas (radiadores, tapas, accesorios): Nuevos, usados, reparados/reconstruidos.
    2.  Reparación de radiadores.
    3.  Instalación y diagnóstico de sistemas de enfriamiento.
*   **Mercado Objetivo:**
    *   Vehículos particulares (segmento "Automotriz").
    *   Vehículos de carga pesada (camiones, tráileres, etc.).
*   **Clientes Típicos:** Propietarios de vehículos, generalmente con poco conocimiento técnico. La asesoría experta es un pilar del negocio.
*   **Proceso Crítico de Búsqueda de Piezas:**
    1.  La identificación precisa del vehículo es esencial: **Marca -> Modelo -> Año -> Versión** (si aplica).
    2.  El **Año** de fabricación es fundamental para la compatibilidad de las piezas.
    3.  La **Versión** del vehículo (ej. tipo de motor, transmisión, con/sin Aire Acondicionado) también puede determinar la pieza correcta.
*   **Productos Principales y Características:**
    *   **Radiadores:** Producto central. Varían en material, tamaño, y especificaciones técnicas (ej. "DPI").
    *   **Tapas de Radiador:** Importantes por sus especificaciones de presión.
    *   **Accesorios:** Componentes complementarios del sistema de enfriamiento.
*   **Condiciones del Producto:** El sistema manejará productos en diversas condiciones ("Nuevo Instalado", "Nuevo Suelto", "Usado/Seminuevo", "Reparado/Reconstruido"), cada una con su estructura de precios.
*   **Proveedores:** Se trabaja con múltiples proveedores, lo que implica variabilidad de precios y calidades para un mismo producto. El sistema debe facilitar la comparación.
*   **Estructura de Precios:** Se gestionarán "Precios de Venta" (al cliente final) y "Precios Proveedor" (costo de adquisición de la pieza).

## 3. Arquitectura del Sistema (Backend - Resumen de Supabase)

*   **Base de Datos (PostgreSQL en Supabase):**
    *   Contiene tablas para productos, tipos de producto, marcas, modelos de vehículos, compatibilidades (producto-modelo-años), precios, proveedores, costos de proveedor, y archivos (imágenes).
    *   Implementa un patrón de auditoría (`control_fields`: active, created_at, updated_at) en la mayoría de las entidades.
*   **API (Supabase Edge Functions):** Proporciona los endpoints para las operaciones CRUD y lógica de negocio.
*   **Autenticación (Supabase Auth):** Gestiona usuarios y sesiones. Los roles principales son Administrador y Empleado/Asistente.
*   **Almacenamiento (Supabase Storage):** Utilizado para almacenar imágenes de productos, marcas, etc.

## 4. Principios y Patrones de Codificación para el Frontend

*   **TypeScript Estricto:** Todo el código será en TypeScript, aprovechando su sistema de tipos para robustez y claridad. Se definirán interfaces y tipos para todos los modelos de datos y props de componentes.
*   **Modularidad y Componentización:**
    *   Construir la UI con componentes React funcionales, pequeños y reutilizables.
    *   Seguir principios de diseño como "Single Responsibility Principle" para componentes.
*   **Gestión de Estado Estratégica:**
    *   **TanStack Query:** Para el estado derivado del servidor (obtención, caché, sincronización y actualización de datos de la API).
    *   **Zustand:** Para el estado global de la UI que necesita ser compartido entre componentes no directamente relacionados (ej. estado de modales, filtros globales de UI, información de sesión del usuario si es compleja).
    *   `useState` / `useReducer`: Para el estado local y simple de los componentes.
*   **Estilo y Theming:**
    *   Utilizar Material-UI (MUI) para la librería de componentes.
    *   Aprovechar el sistema de theming de MUI para una apariencia consistente.
    *   Se podrán usar estilos CSS directos (`.css` o módulos CSS) o `styled-components`/`emotion` si se decide posteriormente, pero la base será MUI.
*   **Código Limpio y Legible:**
    *   Seguir convenciones de nomenclatura claras.
    *   Escribir código auto-documentado siempre que sea posible.
    *   Mantener funciones y componentes concisos.
*   **Manejo de Efectos Secundarios:** Utilizar `useEffect` de React de manera controlada y optimizada. TanStack Query reducirá la necesidad de `useEffect` para la carga de datos.
*   **Pruebas (Aspiracional):** Aunque no es el foco inmediato de la reimplementación inicial, se considerará la estructura para facilitar futuras pruebas (unitarias, integración).
*   **Organización de Directorios:** Se seguirá una estructura lógica para separar componentes, páginas, servicios, tipos, stores, etc., similar a la propuesta previamente (ver sección 5 del `AGENTS.MD` original si se necesita referencia, pero se definirá sobre la marcha).

## 5. Flujos de Usuario Clave a Implementar

*   **Autenticación:** Login, protección de rutas.
*   **Navegación y Búsqueda de Productos:** Desde tipo de producto hasta la lista de productos compatibles (incluyendo filtros por Marca, Modelo, Año, Versión).
*   **Gestión CRUD de Productos:** Incluyendo detalles complejos como compatibilidades, precios múltiples, proveedores.
*   **Gestión CRUD de Proveedores.**
*   **Gestión CRUD de Usuarios (para administradores).**

*(Los detalles específicos de la UI y la lógica de cada flujo se proporcionarán en prompts subsiguientes).*

---