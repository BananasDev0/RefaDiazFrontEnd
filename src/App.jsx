import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { AuthGuard } from './components/AuthGuard';
import { MobileProvider } from './components/MobileProvider';
import { SnackbarProvider } from './components/SnackbarContext';
import { StorageAdapter } from './services/StorageAdapter';
import { useEffect } from 'react';

// Configurar StorageAdapter para usar Supabase
const AppWithStorageConfig = () => {
  useEffect(() => {
    // Configurar Supabase como proveedor de almacenamiento
    StorageAdapter.setProvider(StorageAdapter.PROVIDER.SUPABASE);
    console.log('StorageAdapter configurado para usar Supabase');
  }, []);

  return (
    <MobileProvider>
      <SnackbarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home/*" element={<AuthGuard><Home /></AuthGuard>} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </MobileProvider>
  );
};

export default function App() {
  return <AppWithStorageConfig />;
}