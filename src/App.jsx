import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { AuthGuard } from './components/AuthGuard';
import { MobileProvider } from './components/MobileProvider';
import { SnackbarProvider } from './components/SnackbarContext';
import { NavigationProvider } from './components/NavigationContext';

export default function App() {
  return (
    <MobileProvider>
      <SnackbarProvider>
        <NavigationProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home/*" element={<AuthGuard><Home /></AuthGuard>} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </NavigationProvider>
      </SnackbarProvider>
    </MobileProvider>
  );
}