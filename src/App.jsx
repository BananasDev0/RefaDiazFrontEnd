import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import UserPage from './pages/Users/UserPage';
import { AuthGuard } from './components/AuthGuard';
import { MobileProvider } from './components/MobileProvider';
import { SnackbarProvider } from './components/SnackbarContext';



export default function App() {

  return (
    <SnackbarProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<AuthGuard><Home /></AuthGuard>} />
          <Route exact path="/home" element={<AuthGuard><Home /></AuthGuard>} />
          <Route exact path="/login" element={<MobileProvider><Login /></MobileProvider>} />
          <Route exact path='/user' element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}


