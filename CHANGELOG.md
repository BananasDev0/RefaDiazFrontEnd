# Registro de Cambios - RefaDiaz

Todos los cambios importantes del sistema se documentan en este archivo.

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
