/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
  // Define the environment variable for tests
  define: {
    'import.meta.env.VITE_API_REFA_BASE_PATH': JSON.stringify('/api'),
  },
})
