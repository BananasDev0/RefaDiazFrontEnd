import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, beforeEach } from 'vitest';
import { useProducts } from './useProducts';
import { useProductStore } from '../stores/useProductStore';
import React from 'react';
import { getProducts } from '../services/ProductService';

// Create a client for each test to ensure isolation
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
    },
  },
});

describe('useProducts hook', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    // Create a new QueryClient for each test
    queryClient = createTestQueryClient();
    // Reset the store before each test
    useProductStore.setState({ productType: null, filters: { textSearch: null, productCategoryId: null, brandId: null, modelId: null, year: null } });
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  );

  it('should not fetch products if productType is not set', async () => {
    const { result } = renderHook(() => useProducts({ limit: 20, offset: 0 }), { wrapper });

    // Expect that the query is not enabled and no data is fetched
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  it('should fetch paginated products when a productType is selected', async () => {
    // Set the product type in the store to enable the query
    useProductStore.setState({ productType: '1' });

    const { result } = renderHook(() => useProducts({ limit: 1, offset: 0 }), { wrapper });

    // Expect the query to be loading initially
    expect(result.current.isLoading).toBe(true);

    // Wait for the query to complete
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // Check that the data is fetched correctly from the mock API
    expect(result.current.data?.data).toHaveLength(1);
    expect(result.current.data?.data[0].name).toBe('Radiador de Aluminio para Civic');
    expect(result.current.data?.pagination).toEqual({
      limit: 1,
      offset: 0,
      total: 1,
    });
  });

  it('should keep compatibility with the legacy array contract', async () => {
    const response = await getProducts('1', {
      textSearch: null,
      productCategoryId: null,
      brandId: null,
      modelId: null,
      year: null,
    });

    expect(response.data).toHaveLength(1);
    expect(response.pagination).toEqual({
      limit: 1,
      offset: 0,
      total: 1,
    });
  });
});
