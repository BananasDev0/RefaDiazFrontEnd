import { http, HttpResponse } from 'msw'
import type { Provider } from '../types/provider.types'
import type { Product } from '../types/product.types'

const apiBaseUrl = import.meta.env.VITE_API_REFA_BASE_PATH || '/api';

// Exporta los datos originales para poder reiniciarlos en los tests
export const originalMockProviders: Provider[] = [
  {
    id: 1,
    name: 'Proveedor de Maquinaria Pesada S.A. de C.V.',
    phoneNumber: '55-1234-5678',
    address: 'Av. Industrial #123, Parque Industrial, Querétaro, Qro.',
    comments: 'Contacto principal: Juan Pérez. Entrega los martes y jueves.',
    active: true,
    createdAt: '2023-10-26T10:00:00Z',
    updatedAt: '2023-10-26T10:00:00Z',
  },
  {
    id: 2,
    name: 'Refacciones y Partes "El Veloz"',
    phoneNumber: '81-8765-4321',
    address: 'Calle del Taller #45, Col. Centro, Monterrey, NL.',
    comments: 'Preguntar por Engracia. Suelen tener descuentos por volumen.',
    active: true,
    createdAt: '2023-05-15T14:30:00Z',
    updatedAt: '2024-01-20T11:00:00Z',
  },
  {
    id: 3,
    name: 'Suministros Industriales del Sureste',
    phoneNumber: '99-9876-5432',
    address: 'Carretera a Progreso Km 5, Mérida, Yuc.',
    active: false,
    createdAt: '2022-11-30T18:00:00Z',
    updatedAt: '2023-09-01T09:45:00Z',
  },
];

// Usar `let` para permitir modificación en los handlers
let mockProviders: Provider[] = JSON.parse(JSON.stringify(originalMockProviders));

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Radiador de Aluminio para Civic',
    productTypeId: 1,
    stockCount: 15,
    comments: 'Radiador de alto rendimiento',
    dpi: 'RD-HON-CIV-1822',
    files: [],
    productProviders: [],
    productPrices: [],
    productCarModels: [
      {
        carModelId: 101,
        initialYear: 2018,
        lastYear: 2022,
        carModel: {
          id: 101,
          name: 'Civic',
          brandId: 201,
          brand: { id: 201, name: 'Honda', brandTypeId: 1 },
        },
      },
    ],
  },
  {
    id: 2,
    name: 'Bomba de Agua para Lobo',
    productTypeId: 2,
    stockCount: 30,
    comments: 'Bomba de agua original',
    dpi: 'BA-FOR-LOB-1520',
    files: [],
    productProviders: [],
    productPrices: [],
    productCarModels: [
      {
        carModelId: 103,
        initialYear: 2015,
        lastYear: 2020,
        carModel: {
          id: 103,
          name: 'Lobo',
          brandId: 202,
          brand: { id: 202, name: 'Ford', brandTypeId: 1 },
        },
      },
    ],
  },
  {
    id: 3,
    name: 'Filtro de Aire K&N',
    productTypeId: 3,
    stockCount: 50,
    comments: 'Filtro de alto flujo lavable',
    dpi: 'FA-KN-UNIV',
    files: [],
    productProviders: [],
    productPrices: [],
    productCarModels: [
      {
        carModelId: 101,
        initialYear: 2000,
        lastYear: 2024,
        carModel: {
          id: 101,
          name: 'Civic',
          brandId: 201,
          brand: { id: 201, name: 'Honda', brandTypeId: 1 },
        },
      },
      {
        carModelId: 103,
        initialYear: 2000,
        lastYear: 2024,
        carModel: {
          id: 103,
          name: 'Lobo',
          brandId: 202,
          brand: { id: 202, name: 'Ford', brandTypeId: 1 },
        },
      },
    ],
  },
];

// Exporta una función para reiniciar los proveedores antes de cada test
export const resetMockProviders = () => {
  mockProviders = JSON.parse(JSON.stringify(originalMockProviders));
}

export const handlers = [
  http.get(`${apiBaseUrl}/providers`, () => {
    return HttpResponse.json({
      providers: mockProviders,
      totalCount: mockProviders.length,
    })
  }),

  // Ahora el id viene como query param, no como path param
  http.put(`${apiBaseUrl}/providers`, async ({ request }) => {
    const idParam = request.url.split('?')[1].split('=')[1];
    if (!idParam) {
      return new HttpResponse(null, { status: 400 });
    }
    const id = Number(idParam);
    const updates = await request.json() as Partial<Provider>;
    const providerIndex = mockProviders.findIndex(p => p.id === id);

    if (providerIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    mockProviders[providerIndex] = { ...mockProviders[providerIndex], ...updates };

    return HttpResponse.json(mockProviders[providerIndex]);
  }),

  http.delete(`${apiBaseUrl}/providers`, ({ request }) => {
    const idParam = request.url.split('?')[1].split('=')[1];
    if (!idParam) {
      return new HttpResponse(null, { status: 400 });
    }
    const id = Number(idParam);
    const providerIndex = mockProviders.findIndex(p => p.id === id);

    if (providerIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    mockProviders.splice(providerIndex, 1);

    return new HttpResponse(null, { status: 204 });
  }),

  http.get(`${apiBaseUrl}/products`, ({ request }) => {
    const url = new URL(request.url);
    const productTypeId = url.searchParams.get('productTypeId');
    const brandId = url.searchParams.get('brandId');
    const modelId = url.searchParams.get('modelId');
    const modelYear = url.searchParams.get('modelYear');
    const q = url.searchParams.get('q');

    let filteredProducts = mockProducts;

    if (productTypeId) {
      filteredProducts = filteredProducts.filter(p => p.productTypeId === Number(productTypeId));
    }

    if (brandId) {
      filteredProducts = filteredProducts.filter(p => 
        p.productCarModels.some(pcm => pcm.carModel?.brand?.id === Number(brandId))
      );
    }

    if (modelId) {
      filteredProducts = filteredProducts.filter(p => 
        p.productCarModels.some(pcm => pcm.carModel.id === Number(modelId))
      );
    }

    if (modelYear) {
      const year = Number(modelYear);
      filteredProducts = filteredProducts.filter(p => 
        p.productCarModels.some(pcm => pcm.initialYear <= year && pcm.lastYear >= year)
      );
    }

    if (q) {
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(q.toLowerCase()) || 
        (p.dpi && p.dpi.toLowerCase().includes(q.toLowerCase()))
      );
    }

    return HttpResponse.json(filteredProducts);
  }),
]
