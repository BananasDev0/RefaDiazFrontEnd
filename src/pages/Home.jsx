// src/pages/Home.jsx
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import ProductsPage from './Products/ProductsPage';
import ProvidersPage from './Providers/ProviderPage';
import UserPage from './Users/UserPage';
import { PATHS } from '../constants/paths';

export default function Home() {
  const navigate = useNavigate();

  return (
    <AppLayout navigate={navigate}>
      <Routes>
        <Route path="/" element={<Navigate to={PATHS.PRODUCTS} />} />
        <Route path="products/*" element={<ProductsPage />} />
        <Route path="providers/*" element={<ProvidersPage />} />
        <Route path="users/*" element={<UserPage />} />
      </Routes>
    </AppLayout>
  );
}