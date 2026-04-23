# Registro de Cambios - RefaDiaz

Todos los cambios importantes del sistema se documentan en este archivo.

---

## [2026-03-08]

### Catalogo y formulario de accesorios

**Descripcion:**
Se agrego soporte completo para accesorios dentro del flujo compartido de productos, incluyendo catalogo, formulario, categorias, relacion opcional con modelos de auto y filtros propios del modulo.

**Funcionalidad:**
- Se habilito el catalogo de accesorios dentro de `ProductCatalog`, reutilizando la misma ruta dinamica y la misma abstraccion base que radiadores
- Se agrego una tarjeta especifica para accesorios con categoria visual, nombre estandarizado y compatibilidad vehicular opcional
- Se reemplazo el placeholder del formulario de accesorios por un flujo real con imagenes, categoria y relacion de marca/modelo
- Se incorporo la administracion inline de categorias de accesorios desde el formulario
- Se habilito la relacion opcional de accesorios con modelos de auto sin rango de años
- Se agregaron filtros para accesorios: busqueda por texto, categoria y modelo de auto
- Se extendio la capa de tipos, store, servicios y mocks para soportar categorias de producto y filtros de accesorios

**Archivos modificados:**
- `src/pages/Products/ProductCatalog.tsx`
- `src/pages/Products/ProductFilterBar.tsx`
- `src/pages/Products/ProductFormPage.tsx`
- `src/pages/Products/ProductGrid.tsx`
- `src/pages/Products/AccessoryCard.tsx`
- `src/pages/Products/forms/productTypeForms/AccessoryForm.tsx`
- `src/pages/Products/forms/AccessoryCategoryManager.tsx`
- `src/pages/Products/forms/AccessoryModelManager.tsx`
- `src/pages/Products/forms/dialogs/AddAccessoryCategoryDialog.tsx`
- `src/pages/Products/forms/dialogs/DeleteAccessoryCategoryDialog.tsx`
- `src/pages/Products/filters/ProductCategoryFilter.tsx`
- `src/services/ProductService.ts`
- `src/hooks/useProductCategories.ts`
- `src/stores/useProductStore.ts`
- `src/types/product.types.ts`
- `src/types/productCategory.types.ts`
- `src/mocks/handlers.ts`

---

## [2026-03-06]

### Soporte para componentes en radiadores

**Descripcion:**
Se actualizo el frontend para soportar el nuevo contrato de productos con `components`, permitiendo administrar tapas asociadas a radiadores dentro del mismo flujo de formulario.

**Funcionalidad:**
- Se agrego una seccion `Tapas` dentro del formulario de radiadores
- Ahora es posible crear tapas nuevas desde un dialogo embebido en el flujo del radiador
- Las tapas existentes se hidratan al abrir el radiador en modo edicion
- El detalle completo de una tapa existente se carga bajo demanda al abrirla
- Las tapas nuevas y existentes pueden editarse desde el flujo del radiador
- El guardado del radiador ahora ejecuta un flujo secuencial compatible con backend:
  - crea tapas nuevas primero
  - actualiza tapas existentes editadas
  - guarda el radiador con el arreglo final de `components`
- Se corrigieron problemas de formularios anidados y se alineo la UI del dialogo con los patrones visuales del proyecto

**Archivos modificados:**
- `src/types/product.types.ts`
- `src/pages/Products/ProductFormPage.tsx`
- `src/pages/Products/forms/ProductBasicInfo.tsx`
- `src/pages/Products/forms/ProductIdentityFields.tsx`
- `src/pages/Products/forms/ProductImageManager.tsx`
- `src/pages/Products/forms/RadiatorComponentsManager.tsx`
- `src/pages/Products/forms/dialogs/CapDialog.tsx`
- `src/pages/Products/forms/dialogs/capDialogSchema.ts`
- `src/pages/Products/forms/productTypeForms/RadiatorForm.tsx`

---

## [2026-01-12]

### Eliminacion de modelos desde el formulario de productos

**Descripcion:**
Se agrego la funcionalidad para eliminar modelos de vehiculos directamente desde el selector de modelos en el formulario de productos. Ahora cada modelo en la lista desplegable muestra un icono de eliminar que permite remover el modelo del sistema.

**Funcionalidad:**
- Boton de eliminar visible en cada opcion del selector de modelos (excepto la opcion "Añadir nuevo modelo")
- Dialogo de confirmacion antes de eliminar para prevenir eliminaciones accidentales
- Actualizacion automatica de la lista de modelos despues de eliminar

**Archivos modificados:**
- `src/services/ProductService.ts` - Nueva funcion `deleteCarModel`
- `src/hooks/useVehicleData.ts` - Nuevo hook `useDeleteCarModel`
- `src/pages/Products/forms/ModelCompatibilityManager.tsx` - Integracion del boton de eliminar en el selector
- `src/pages/Products/forms/dialogs/DeleteModelDialog.tsx` - Nuevo componente de dialogo de confirmacion

---

## [2026-01-10]

### Corrección de formularios anidados en creación de modelos

**Problema:**
Al crear un nuevo modelo de vehículo desde el formulario de productos (sección "Compatibilidad de Modelos"), el formulario principal se reiniciaba y salía del modo edición. Esto ocurría porque el diálogo de creación de modelo tenía un tag `<form>` anidado dentro del formulario principal, causando que el submit del diálogo disparara también el submit del formulario padre.

**Solución:**
Se eliminó el tag `<form>` del componente `AddModelDialog` y se cambió el botón de guardar para usar `onClick={handleSubmit(onSubmit)}` en lugar de `type="submit"`. React Hook Form permite llamar `handleSubmit()` directamente desde un evento click, validando el formulario y ejecutando el callback si es válido, sin necesidad de un tag `<form>`.

**Archivos modificados:**
- `src/pages/Products/forms/dialogs/AddModelDialog.tsx`

---

## [2026-01-09]

### Mejora visual en selector de marcas

**Problema:**
Al buscar una marca en el formulario de compatibilidad de productos, la lista mostraba todas las marcas mezcladas en dos grupos: "Automotriz" y "Carga Pesada". Sin embargo, ambos grupos se veían exactamente igual, lo que dificultaba identificar rápidamente a qué categoría pertenecía cada marca.

**Solución:**
Ahora cada grupo de marcas tiene un color de fondo diferente:
- Las marcas **Automotriz** aparecen bajo un encabezado con color azul
- Las marcas de **Carga Pesada** aparecen bajo un encabezado con color rojo

Esto permite distinguir de un vistazo en qué sección te encuentras mientras buscas una marca, haciendo más rápida y sencilla la selección.
