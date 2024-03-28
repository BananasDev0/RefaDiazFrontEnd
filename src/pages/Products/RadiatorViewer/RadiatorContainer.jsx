
import { useEffect, useState } from 'react';
import { getAllRadiators } from '../../../services/RadiatorService';
import { getImageURLFromStorage } from '../../../services/Firebase/storage';
import { Select, MenuItem } from '@mui/material';
import CustomInput from '../../../components/CustomInput';
import RadiatorList from './RadiatorList';

const RadiatorContainer = ({ onRadiatorSelect }) => {
  const [radiators, setRadiators] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('radiadores');

  console.log('asdasd')

  useEffect(() => {
    const fetchRadiators = async () => {
      try {
        const radiators = await getAllRadiators(searchTerm);
        const radiatorsWithImages = await Promise.all(radiators.map(async (radiator) => {
          if (radiator.imageUrl) {
            const imageUrl = await getImageURLFromStorage(radiator.imageUrl).catch(error => {
              console.error("Error al obtener url imagen de storage para radiador:", radiator.name, error);
              return ''; 
            });
            return { ...radiator, imageUrl };
          } else {
            return radiator;
          }
        }));

        setRadiators(radiatorsWithImages);
      } catch (error) {
        console.error("Error al obtener los radiadores:", error);
      }
    };

    fetchRadiators();
  }, [searchOption, searchTerm]);
  
  return (
    <div>
      <RadiatorList title="Lista de Radiadores" radiators={radiators} onRadiatorSelect={onRadiatorSelect} />
    </div>
  );
};

export default RadiatorContainer;
