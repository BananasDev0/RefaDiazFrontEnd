import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, beforeEach } from 'vitest';
import { useProviders } from './useProviders';
import { SnackbarProvider } from '../contexts/SnackbarContext';
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

describe('useProviders hook', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    // Create a new QueryClient for each test
    queryClient = createTestQueryClient();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>{children}</SnackbarProvider>
    </QueryClientProvider>
  );

  it('should return a list of providers from the mock API', async () => {
    const { result } = renderHook(() => useProviders(), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.providers).toHaveLength(3);
    expect(result.current.providers[0].name).toBe('Proveedor de Maquinaria Pesada S.A. de C.V.');
    expect(result.current.totalProviders).toBe(3);
    expect(result.current.isError).toBe(false);
  });

  it('should update a provider and refetch the list', async () => {
    const { result } = renderHook(() => useProviders(), { wrapper });

    // Wait for initial data to load
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    const originalName = result.current.providers.find(p => p.id === 1)?.name;
    expect(originalName).not.toBe('Updated Name');

    // Trigger the mutation
    act(() => {
      result.current.updateProvider({ id: 1, data: { name: 'Updated Name' } });
    });

    // Wait for the mutation to settle and the list to be refetched
    await waitFor(() => {
      const updatedProvider = result.current.providers.find(p => p.id === 1);
      expect(updatedProvider?.name).toBe('Updated Name');
    });

    // Also check the loading state of the mutation itself
    expect(result.current.isUpdating).toBe(false);
  });

  it('should delete a provider and refetch the list', async () => {
    const { result } = renderHook(() => useProviders(), { wrapper });

    // Wait for initial data to load
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.providers).toHaveLength(3);

    // Trigger the mutation
    act(() => {
      result.current.deleteProvider(1);
    });

    // Wait for the mutation to settle and the list to be refetched
    await waitFor(() => {
      expect(result.current.providers).toHaveLength(2);
      expect(result.current.providers.find(p => p.id === 1)).toBeUndefined();
    });

    expect(result.current.isDeleting).toBe(false);
  });
});
