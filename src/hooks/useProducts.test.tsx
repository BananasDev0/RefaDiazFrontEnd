import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, beforeEach } from 'vitest';
import { useProducts } from './useProducts';
import { useProductStore } from '../stores/useProductStore';
import React from 'react';

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
    useProductStore.setState({ productType: null, filters: { textSearch: null, brandId: null, modelId: null, year: null } });
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  );

  it('should not fetch products if productType is not set', async () => {
    const { result } = renderHook(() => useProducts(), { wrapper });

    // Expect that the query is not enabled and no data is fetched
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  it('should fetch products when a productType is selected', async () => {
    // Set the product type in the store to enable the query
    useProductStore.setState({ productType: '1' });

    const { result } = renderHook(() => useProducts(), { wrapper });

    // Expect the query to be loading initially
    expect(result.current.isLoading).toBe(true);

    // Wait for the query to complete
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // Check that the data is fetched correctly from the mock API
    expect(result.current.data).toHaveLength(1);
    expect(result.current.data?.[0].name).toBe('Radiador de Aluminio para Civic');
  });
});