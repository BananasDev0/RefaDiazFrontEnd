# Product Components Implementation Tasks

## Objetivo

Actualizar el frontend para soportar el nuevo contrato de backend de `components`, donde un componente tambien es un producto y la primera implementacion soportada es `TAPA` asociada a radiadores.

## Fuente de verdad

- `docs/frontend-contract.md`

## Reglas funcionales que debemos respetar

- `GET /products?id=<id>` puede regresar `components`.
- Cada item de `components` incluye `componentProductId` y `componentProduct`.
- `POST /products` y `PUT /products?id=<id>` aceptan `components`.
- En actualizaciones, `components` tiene semantica de reemplazo total.
- Si `components` se omite en `PUT`, el backend conserva el estado actual.
- Si `components` se envia como `[]`, el backend elimina logicamente todas las relaciones activas.
- No deben enviarse componentes duplicados.
- La compatibilidad vehicular permanece solo en el radiador padre.
- El frontend debe crear primero la tapa si es nueva y despues enviar el radiador con `components`.
- Por ahora no se permitira seleccionar tapas existentes desde el flujo del radiador.
- Por ahora las unicas acciones permitidas en la UI seran agregar una tapa nueva o quitar una tapa ya asociada.

## Decision actual de UX

- La creacion de tapas nuevas se hara con un `Dialog`.
- Ese `Dialog` no intentara replicar el formulario completo de radiador.
- Por ahora el formulario de tapa solo capturara:
  - `name`
  - `dpi`
  - `files`
  - `productProviders`
- `comments` no se capturara en la tapa en esta fase.
- `productPrices` no se capturara en la tapa en esta fase.
- La UI del radiador mostrara las tapas actuales para permitir quitarlas.
- Las tapas nuevas se guardaran primero como draft en frontend; no se crearan en backend hasta guardar el radiador.

## Reutilizacion prevista

- Reutilizar `src/pages/Products/forms/ProductImageManager.tsx` para imagenes.
- Reutilizar `src/pages/Products/forms/ProductProvidersManager.tsx` para proveedores.
- No reutilizar `src/pages/Products/forms/ProductBasicInfo.tsx` tal como esta, porque hoy incluye `stockCount` y `comments`.
- Extraer un componente base mas pequeno para identidad del producto, por ejemplo campos `name` y `dpi`, o hacer configurable el componente actual si eso queda limpio.

## Estado actual

- `src/types/product.types.ts` no modela `components`.
- `src/pages/Products/ProductFormPage.tsx` no hidrata ni serializa `components`.
- `src/pages/Products/forms/productTypeForms/RadiatorForm.tsx` no tiene UI para componentes.
- `src/pages/Products/productSchema.ts` no valida el estado de componentes.
- `src/hooks/useProductMutations.ts` y `src/services/ProductService.ts` aun no orquestan un flujo de dos pasos para crear componente y radiador cuando aplique.

## Tareas de implementacion

### Tarea 1. Actualizar tipos de dominio y del formulario

Objetivo: modelar correctamente componentes existentes y tapas nuevas en borrador.

- Agregar tipos para `ProductComponent` y estructuras derivadas necesarias.
- Extender `Product` para leer `components` desde la API.
- Extender `ProductFormData` para representar componentes en el formulario.
- Definir un tipo para tapas nuevas en borrador dentro del radiador.
- Definir una forma clara de distinguir entre:
  - estado sin cambios en edicion
  - lista vacia intencional
  - lista final con componentes existentes y nuevas tapas draft

### Tarea 2. Adaptar transformaciones e hidratacion

Objetivo: llevar `components` entre API y formulario del radiador sin lazy loading.

- Actualizar transformaciones de `getProductById` a formulario en `src/pages/Products/ProductFormPage.tsx`.
- Hidratar inmediatamente los componentes existentes al abrir un radiador en modo edicion.
- No usar lazy loading para los componentes ya asociados al radiador, porque forman parte del estado inicial editable.
- Mostrar en la UI la informacion de las tapas ya asociadas para permitir retirarlas si el usuario lo decide.

### Tarea 3. Adaptar validacion del radiador y del dialogo de tapa

Objetivo: validar por separado el formulario principal y el formulario interno de tapa.

- Extender `src/pages/Products/productSchema.ts` para contemplar el estado de `components`.
- Crear schema especifico para el `Dialog` de tapa.
- Validar `name`, `dpi`, imagenes y proveedores segun aplique.
- Validar reglas para evitar duplicados y estados inconsistentes.

### Tarea 4. Preparar piezas reutilizables para el dialogo

Objetivo: reutilizar lo que ya existe y aislar lo que hoy no aplica para tapa.

- Confirmar reutilizacion de `ProductImageManager`.
- Confirmar reutilizacion de `ProductProvidersManager`.
- Extraer o adaptar un componente pequeno para los campos `name` y `dpi`.
- Evitar reutilizar bloques que obliguen a mostrar `stockCount`, `comments` o `productPrices`.

### Tarea 5. Implementar dialogo de tapa nueva

Objetivo: crear una experiencia acotada para capturar una tapa nueva sin salir del radiador.

- Crear un `CapDialog` con su propio `useForm`.
- Incluir en el dialogo:
  - `name`
  - `dpi`
  - `files`
  - `productProviders`
- Al confirmar el dialogo, guardar una tapa draft dentro del estado del radiador.
- No hacer `POST /products` al confirmar el dialogo.

### Tarea 6. Integrar UI de componentes en radiadores

Objetivo: permitir agregar y quitar tapas desde el formulario de radiador.

- Agregar una seccion de componentes en `src/pages/Products/forms/productTypeForms/RadiatorForm.tsx`.
- Permitir abrir el dialogo para capturar una nueva tapa.
- Permitir quitar tapas ya asociadas o creadas en el formulario antes de guardar.
- No incluir por ahora flujo de seleccion de tapas existentes.
- Representar claramente cuando una tapa ya existe en backend y cuando es una nueva tapa pendiente de crear.

### Tarea 7. Orquestar guardado de dos pasos

Objetivo: persistir primero las tapas nuevas y despues el radiador.

- Si el usuario crea una tapa nueva dentro del flujo, crear primero ese producto.
- Tomar el `id` devuelto y construir `components: [{ componentProductId }]`.
- Crear o actualizar el radiador usando el arreglo final de componentes.
- Mantener el payload del radiador libre de objetos inline de componente no soportados por el contrato.
- Si el usuario solo quita tapas existentes, no crear productos nuevos y enviar el estado final correcto de `components`.
- Definir valor por defecto o estrategia para campos obligatorios del backend que no estaran en la UI de tapa, por ejemplo `stockCount`, si sigue siendo requerido.

### Tarea 8. Respetar semantica de actualizacion

Objetivo: no perder relaciones por diferencias entre estado inicial y estado editado.

- En edicion, decidir explicitamente cuando omitir `components`.
- Enviar `components: []` si el usuario elimino todos los componentes.
- Enviar el arreglo completo si hubo cambios.
- Evitar perder relaciones por enviar un subconjunto accidental.

### Tarea 9. Ajustar pruebas y validacion manual

Objetivo: cubrir el flujo incremental antes de cerrar la feature.

- Agregar o actualizar pruebas de transformacion de datos.
- Agregar pruebas del `Dialog` de tapa y su schema.
- Cubrir casos de alta de radiador con tapa nueva.
- Cubrir edicion sin cambios, edicion con nueva tapa y eliminacion total.

## Orden recomendado de ejecucion

1. Tipos de dominio y shape del formulario.
2. Transformaciones e hidratacion.
3. Campos reutilizables para `name` y `dpi`.
4. Dialogo de tapa con imagenes y proveedores.
5. Integracion del dialogo en radiadores.
6. Guardado secuencial.
7. Pruebas y verificacion manual.

## Riesgos a vigilar

- Confundir "no se modifico" con "quitar todo".
- Duplicar componentes por falta de deduplicacion en frontend.
- Intentar enviar objetos de tapa embebidos en el payload del radiador.
- Asociar compatibilidad vehicular a la tapa en lugar del radiador.
- Disenar la UI como si existiera seleccion de tapas existentes cuando ese flujo no esta habilitado en esta fase.
