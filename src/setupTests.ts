import '@testing-library/jest-dom/vitest';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { resetMockProducts, resetMockProviders, resetMockVehicleNotes } from './mocks/handlers';
import { server } from './mocks/server';

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  server.resetHandlers();
  resetMockProviders();
  resetMockProducts();
  resetMockVehicleNotes();
});

afterAll(() => {
  server.close();
});
