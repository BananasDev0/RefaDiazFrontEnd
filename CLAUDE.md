# CLAUDE.md - RefaDiaz Frontend

Sistema de Gestión para Radiadores Díaz - Frontend en React/TypeScript.

## Proyecto

**RefaDiaz** - Sistema para digitalizar operaciones de refaccionaria especializada en sistemas de enfriamiento automotriz: inventario, ventas, reparaciones e instalaciones.

## Stack Tecnológico

| Categoría | Tecnología |
|-----------|------------|
| Framework | React 18 + TypeScript |
| Bundler | Vite |
| UI | Material-UI (MUI) v7 |
| Routing | React Router DOM v6 |
| Estado Servidor | TanStack Query v5 |
| Estado Cliente | Zustand v5 |
| Formularios | React Hook Form v7 + Yup |
| HTTP | Axios |
| Backend | Supabase (Auth, DB, Storage, Edge Functions) |

## Estructura de Directorios

```
src/
├── api/          # Lógica de llamadas API
├── assets/       # Recursos estáticos
├── components/   # Componentes reutilizables
│   └── common/   # Componentes genéricos
├── constants/    # Constantes
├── contexts/     # Context providers
├── hooks/        # Hooks personalizados
├── pages/        # Páginas/vistas
├── services/     # Servicios y lógica de negocio
├── stores/       # Stores de Zustand
├── styles/       # Estilos globales
├── types/        # Definiciones TypeScript
└── utils/        # Utilidades
```

## Archivos Clave

- `src/theme.ts` - Tema de MUI
- `src/services/axiosConfig.ts` - Instancia Axios configurada

## Dominio del Negocio

### Servicios
- Venta de piezas: radiadores, tapas, accesorios (nuevos, usados, reparados)
- Reparación de radiadores
- Instalación y diagnóstico de sistemas de enfriamiento

### Mercado
- Vehículos particulares (Automotriz)
- Vehículos de carga pesada

### Búsqueda de Piezas
Flujo crítico: **Marca → Modelo → Año → Versión**
- El año es fundamental para compatibilidad
- La versión (motor, transmisión, A/C) determina la pieza correcta

### Productos
- **Radiadores**: Producto central, varían en material, tamaño, DPI
- **Tapas de Radiador**: Especificaciones de presión
- **Accesorios**: Componentes complementarios

### Condiciones de Producto
- Nuevo Instalado
- Nuevo Suelto
- Usado/Seminuevo
- Reparado/Reconstruido

### Precios
- Precio de Venta (cliente final)
- Precio Proveedor (costo de adquisición)

## Convenciones de Código

### Nomenclatura
| Tipo | Convención | Ejemplo |
|------|------------|---------|
| Componentes | PascalCase | `MiComponente.tsx` |
| Archivos no componentes | camelCase | `miServicio.ts` |
| Variables/funciones | camelCase | `getUserData` |
| Tipos/interfaces | PascalCase | `type UserData` |

### TypeScript
- Tipado estricto, evitar `any`
- `type` para props y objetos
- `interface` para objetos extensibles
- Tipos en el mismo archivo o `types.ts` del directorio

### Componentes React
- Componentes funcionales con Hooks
- Props tipadas
- Exportaciones nombradas: `export const MiComponente`

### Importaciones (orden)
1. Bibliotecas terceros (React, MUI)
2. Importaciones absolutas (`/src/...`)
3. Importaciones relativas (`./`, `../`)

## Gestión de Estado

### TanStack Query
- Todas las operaciones con servidor (GET, POST, PUT, DELETE)
- Query keys descriptivas: `['usuarios', 'lista']`, `['usuario', userId]`
- `staleTime`: 5 minutos por defecto

### Zustand
- Estado global de UI compartido
- Stores en `src/stores/`

### React Hook Form + Yup
- Todos los formularios
- Validación con esquemas Yup via `@hookform/resolvers/yup`

## Estilos

- Componentes MUI siempre que sea posible
- `sx` prop para estilos puntuales
- `styled()` para componentes con estilos complejos
- Tema en `src/theme.ts`

## API

- Instancia Axios en `src/services/axiosConfig.ts`
- Interceptor maneja errores y autenticación automática
- Backend: Supabase Edge Functions

## Base de Datos (Supabase/PostgreSQL)

Entidades principales:
- Productos, tipos de producto
- Marcas, modelos de vehículos
- Compatibilidades (producto-modelo-años)
- Precios, proveedores, costos
- Archivos/imágenes

Patrón de auditoría: `control_fields` (active, created_at, updated_at)

## Flujos Principales

1. **Autenticación**: Login, protección de rutas
2. **Búsqueda de Productos**: Filtros por Marca, Modelo, Año, Versión
3. **CRUD Productos**: Compatibilidades, precios múltiples, proveedores
4. **CRUD Proveedores**
5. **CRUD Usuarios** (admin)

## Roles de Usuario

- Administrador
- Empleado/Asistente

## Comandos

```bash
npm run dev      # Desarrollo
npm run build    # Build producción
npm run lint     # Linter
npm run preview  # Preview build
```
