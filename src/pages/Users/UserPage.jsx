import { Route, Routes, useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/NavigationBar';
import UserMenu from './UserMenu';
import UserCreation from './UserCreation';
import { PATHS } from '../../constants/paths';

const UserPage = () => {
  const navigate = useNavigate();
  const handleOptionSelect = (optionId) => {
    if (optionId === 'add-user') {
      navigate(PATHS.ADD_USER);
    }
    // Puedes manejar otras opciones aquí si agregas más en el futuro
  };

  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<UserMenu onOptionSelect={handleOptionSelect} />} />
        <Route path="add-user" element={<UserCreation />} />
      </Routes>

    </div>
  );
};

export default UserPage;