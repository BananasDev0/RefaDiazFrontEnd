import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import theme from './theme'
import { SnackbarProvider } from './contexts/SnackbarContext'
import { MobileProvider } from './contexts/MobileProvider'
import { Login } from './pages/Login'
import { AuthGuard } from './components/AuthGuard'
import { Dashboard } from './pages/Dashboard'
import Providers from './pages/Providers'
import ProductTypeSelection from './pages/Products/ProductTypeSelection'
import ProductCatalog from './pages/Products/ProductCatalog'
import ProductFormPage from './pages/Products/ProductFormPage'
import Users from './pages/Users'

// Crear instancia de QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      retry: 1,
    },
  },
})

// Componente principal con todos los proveedores
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <MobileProvider>
            <CssBaseline />
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={
                    <AuthGuard>
                      <Dashboard />
                    </AuthGuard>
                  }
                >
                  <Route index element={<Navigate to="/products" replace />} />
                  <Route path="products">
                    <Route index element={<ProductTypeSelection />} />
                    <Route path=":productType/new" element={<ProductFormPage />} />
                    <Route path=":productType/edit/:productId" element={<ProductFormPage />} />
                    <Route path=":productType/*" element={<ProductCatalog />} />
                  </Route>
                  <Route path="providers" element={<Providers />} />
                  <Route path="users" element={<Users />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </MobileProvider>
        </SnackbarProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
