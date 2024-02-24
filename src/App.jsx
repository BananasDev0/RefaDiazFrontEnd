import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/home" element={<Home/> }/>
        <Route exact path="/login" element={<Login/> }/>
      </Routes>
    </BrowserRouter>
  );
}


