import { http, HttpResponse } from 'msw'
import type { Provider } from '../types/provider.types'

const apiBaseUrl = import.meta.env.VITE_API_REFA_BASE_PATH || '/api';

// Export the original data so we can reset it in our tests
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

// Use `let` to allow modification in handlers
let mockProviders: Provider[] = JSON.parse(JSON.stringify(originalMockProviders));

// Export a reset function to be called before each test
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

  http.put(`${apiBaseUrl}/providers/:id`, async ({ request, params }) => {
    const { id } = params;
    const updates = await request.json() as Partial<Provider>;
    const providerIndex = mockProviders.findIndex(p => p.id === Number(id));

    if (providerIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    mockProviders[providerIndex] = { ...mockProviders[providerIndex], ...updates };

    return HttpResponse.json(mockProviders[providerIndex]);
  }),

  http.delete(`${apiBaseUrl}/providers/:id`, ({ params }) => {
    const { id } = params;
    const providerIndex = mockProviders.findIndex(p => p.id === Number(id));

    if (providerIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    mockProviders.splice(providerIndex, 1);

    return new HttpResponse(null, { status: 204 });
  }),
]
