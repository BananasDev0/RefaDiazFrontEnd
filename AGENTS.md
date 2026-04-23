# AGENTS.md

## Proyecto

RefaDiaz Frontend es una aplicacion React + TypeScript + Vite para la gestion de inventario de una refaccionaria enfocada en sistemas de enfriamiento automotriz. El modulo mas sensible hoy es el de productos, donde se administran radiadores, tapas y accesorios con imagenes, proveedores, precios y compatibilidad por modelo/anio.

## Stack y patrones actuales

- React 18 + TypeScript
- Vite
- Material UI
- React Hook Form + Yup para formularios
- TanStack Query para acceso a datos del servidor
- Zustand para estado cliente compartido
- Axios para comunicacion con el backend

## Rutas clave del proyecto

- `src/types/product.types.ts`: tipos de dominio de productos y datos del formulario.
- `src/services/ProductService.ts`: llamadas `GET /products`, `POST /products`, `PUT /products`.
- `src/hooks/useProducts.ts`: lectura de productos.
- `src/hooks/useProductMutations.ts`: creacion, actualizacion y eliminacion.
- `src/pages/Products/ProductFormPage.tsx`: orquestacion del formulario de producto y transformacion a payload.
- `src/pages/Products/forms/productTypeForms/RadiatorForm.tsx`: UI especifica de radiadores.
- `src/pages/Products/forms/productTypeForms/CapForm.tsx`: UI de tapas como producto independiente.
- `src/pages/Products/productSchema.ts`: validacion base del formulario.

## Dominio del negocio

- Radiadores son el producto principal del flujo actual.
- Tapas (`TAPA`) y accesorios tambien son productos del catalogo.
- La compatibilidad vehicular se maneja por `productCarModels`.
- Imagenes, proveedores y precios se capturan desde el mismo flujo de producto.

## Forma de trabajo recomendada

- Mantener consistencia con React Hook Form, Yup, TanStack Query y MUI existentes.
- Evitar `any`; extender los tipos del dominio primero y luego ajustar transformaciones y UI.

## Comandos utiles

```bash
npm run dev
npm run build
npm run lint
npm run test
```
