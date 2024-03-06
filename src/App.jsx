import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route exact path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}


