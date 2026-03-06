# Product Components: Implemented Changes And Frontend Contract

## Purpose

This document summarizes the product component feature as it is currently implemented in the Supabase backend and defines the API contract the frontend should use.

The first supported component type is `TAPA`.

## High-Level Outcome

The backend now supports associating reusable component products to a main product, starting with radiator caps attached to radiators.

Key design decisions:
- A cap (`TAPA`) remains a normal row in `product`.
- Product-to-component associations are stored in `product_component`.
- A single component product can be associated with more than one product.
- Vehicle compatibility remains defined only on the parent radiator through `product_car_model`.
- Component compatibility is transitive from the parent radiator.
- Product update uses full replacement semantics for `components`.
- Component removals are logical deletions by setting `product_component.active = false`.

## Implemented Backend Changes

### Data Model

Implemented bridge table:

```sql
CREATE TABLE product_component (
    product_id INT NOT NULL,
    component_product_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE,
    FOREIGN KEY (component_product_id) REFERENCES product(id) ON DELETE CASCADE,
    UNIQUE (product_id, component_product_id)
) INHERITS (control_fields);
```

Also implemented:
- `TAPA` is ensured in `product_type`.

### Read Behavior

`GET /products?id=<ID>` now includes:
- `components`

Each component entry contains:
- `componentProductId`
- `componentProduct`

### Create Behavior

`POST /products` now accepts:
- `components`

Behavior:
- the main product is created first
- each `componentProductId` is associated through `product_component`
- only existing component products are supported

### Update Behavior

`PUT /products?id=<ID>` now accepts:
- `components`

Behavior:
- if `components` is not sent, component relationships are left unchanged
- if `components` is sent, it is treated as the complete final set
- active relationships missing from the payload are marked inactive
- previously inactive relationships included again are reactivated
- new relationships are inserted

## Frontend Responsibilities

The frontend should treat caps as normal products, but in this initial phase the user is expected to create them as part of the same radiator workflow.

Important clarification:
- the user experience can be a single radiator form
- the backend contract is still a two-step flow
- the frontend must create the component product first
- after receiving the created component product ID, the frontend must send that ID in the radiator `POST` or `PUT` payload under `components`

This means the UI can feel like "create radiator and caps together", but the network flow must be orchestrated by the frontend in sequence.

Expected flow in this phase:
1. the user starts creating or editing a radiator
2. inside that same flow, the UI captures the cap data
3. the frontend sends a `POST /products` to create the cap product first
4. the frontend takes the returned cap product ID
5. the frontend sends the radiator `POST /products` or `PUT /products?id=...` including that ID in `components`

The frontend should not:
- send a new component object inline inside the radiator payload
- send vehicle compatibility for the component product

## Updated Request Contract

## Create Product

Endpoint:

```text
POST /products
```

Payload:

```json
{
  "name": "Radiador ejemplo",
  "comments": "Producto con componente",
  "stockCount": 3,
  "dpi": "DPI-EXAMPLE-001",
  "productTypeId": 1,
  "files": [
    {
      "name": "radiador-ejemplo.png",
      "mimeType": "image/png",
      "storagePath": "products/images/radiador-ejemplo.png",
      "orderId": 1
    }
  ],
  "productProviders": [
    {
      "providerId": 2,
      "numSeries": "SERIE-001",
      "price": {
        "description": "Costo",
        "cost": "$1,234.00"
      }
    }
  ],
  "productPrices": [
    {
      "price": {
        "description": "Venta",
        "cost": "$2,345.00"
      }
    }
  ],
  "productCarModels": [
    {
      "carModelId": 6,
      "initialYear": 2015,
      "lastYear": 2020
    }
  ],
  "components": [
    {
      "componentProductId": 12
    }
  ]
}
```

Rules:
- `componentProductId` must reference an existing product.
- Duplicate component IDs are deduplicated by the backend mapper.
- If `components` is omitted, the product is created without component associations.

## Update Product

Endpoint:

```text
PUT /products?id=<PRODUCT_ID>
```

Payload:

```json
{
  "name": "Radiador ejemplo actualizado",
  "comments": "Producto con componente actualizado",
  "stockCount": 5,
  "dpi": "DPI-EXAMPLE-002",
  "productTypeId": 1,
  "files": [
    {
      "id": 101,
      "name": "radiador-ejemplo-actualizado.png",
      "mimeType": "image/png",
      "storagePath": "products/images/radiador-ejemplo-actualizado.png",
      "orderId": 1
    }
  ],
  "productProviders": [
    {
      "providerId": 2,
      "numSeries": "SERIE-002",
      "price": {
        "description": "Costo actualizado",
        "cost": "$1,444.00"
      }
    }
  ],
  "productPrices": [
    {
      "price": {
        "description": "Venta actualizada",
        "cost": "$2,999.00"
      }
    }
  ],
  "productCarModels": [
    {
      "carModelId": 6,
      "initialYear": 2015,
      "lastYear": 2021
    }
  ],
  "components": [
    {
      "componentProductId": 18
    }
  ]
}
```

Rules:
- If `components` is sent, it replaces the full active set of component relationships.
- If `components` is sent as `[]`, all active component relationships are logically removed.
- If `components` is omitted entirely, existing component relationships are preserved.

## Updated Response Contract

## Product Detail

Endpoint:

```text
GET /products?id=<PRODUCT_ID>
```

Relevant response shape:

```json
{
  "id": 10,
  "name": "Radiador ejemplo",
  "comments": "Producto con componente",
  "stockCount": 3,
  "dpi": "DPI-EXAMPLE-001",
  "productTypeId": 1,
  "productCarModels": [],
  "productPrices": [],
  "productProviders": [],
  "files": [],
  "components": [
    {
      "componentProductId": 12,
      "componentProduct": {
        "id": 12,
        "name": "Tapa 18 PSI",
        "dpi": "CAP-18",
        "productTypeId": 2,
        "active": true
      }
    }
  ]
}
```

Notes:
- Only active relationships are returned.
- Only active component products are returned.
- The frontend should use this response to prefill the edit form.

## Frontend Form Guidance

Recommended UI behavior for radiator forms:
- allow the user to create cap products from within the same radiator create/edit experience
- if the user creates a new cap in that flow, call `POST /products` for the cap first
- after the cap is created, include its ID in the radiator payload `components`
- if the user picks an existing cap, include its existing ID in `components`
- when saving the radiator, send the final selected set as `components`
- on edit, initialize the selected state from `GET /products?id=...`

Suggested internal UI model:

```json
{
  "selectedComponents": [
    {
      "componentProductId": 12,
      "label": "Tapa 18 PSI"
    }
  ]
}
```

Before submit:

```json
{
  "components": [
    {
      "componentProductId": 12
    }
  ]
}
```

## Sequential API Flow Required In This Phase

Even if the UI presents caps and radiator data together, the frontend must execute requests in order.

### Create radiator with a new cap in the same UI flow

1. Create the cap first:

```text
POST /products
```

```json
{
  "name": "Tapa 18 PSI",
  "comments": "Creada desde el flujo del radiador",
  "stockCount": 10,
  "dpi": "CAP-18",
  "productTypeId": 2,
  "productProviders": [],
  "productPrices": []
}
```

2. Read the returned cap ID, for example `12`.

3. Create the radiator using that cap ID:

```text
POST /products
```

```json
{
  "name": "Radiador ejemplo",
  "productTypeId": 1,
  "productCarModels": [],
  "productPrices": [],
  "productProviders": [],
  "components": [
    {
      "componentProductId": 12
    }
  ]
}
```

### Update radiator while creating a new cap in the same UI flow

1. Create the new cap first with `POST /products`.
2. Read the returned cap ID.
3. Send `PUT /products?id=<RADIATOR_ID>` with the full final `components` array.

Because update uses replacement semantics:
- if the frontend wants to keep an old cap and add a new one, both IDs must be sent
- if the frontend wants to replace the old cap with the new one, only the new ID should be sent

## Important Current Constraints

- Inline creation of a new component product inside the radiator request body is not implemented.
- Creating caps from the same screen is valid, but it must be done as a frontend-orchestrated sequence of requests.
- Component vehicle compatibility is not modeled independently.
- The list endpoint still behaves as a normal product catalog; component selection should come from querying products of type `TAPA`.
- Postman examples currently assume `productTypeIdTapa = 2`.

## Suggested Frontend Validation

Recommended client-side checks:
- do not allow duplicate selected components
- do not allow empty or invalid component IDs in the outgoing payload
- keep `components` omitted when the edit screen did not modify component state only if that is intentional
- send `components: []` when the user explicitly removes all components

## Reference Files

- `AGENTS.md`
- `docs/product-components/README.md`
- `docs/product-components/phase-1-data-model.md`
- `docs/product-components/phase-2-read-api.md`
- `docs/product-components/phase-3-create-api.md`
- `docs/product-components/phase-4-update-api.md`
- `postman/refadiaz-supabase.postman_collection.json`
