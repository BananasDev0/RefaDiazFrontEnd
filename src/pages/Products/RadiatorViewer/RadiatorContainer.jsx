import { useEffect, useState } from 'react';
import { getAllRadiators } from '../../../services/RadiatorService';
import { getImageURLFromStorage } from '../../../services/Firebase/storage';
import RadiatorList from './RadiatorList';
import '../../../styles/brandContainer.css';

const RadiatorContainer = ({ onRadiatorSelect, searchTerm, setLoading }) => {
  const [radiators, setRadiators] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchRadiators = async () => {
      try {
        const radiatorsData = await getAllRadiators(searchTerm);

        const radiatorsWithImages = await Promise.all(radiatorsData.map(async (radiator) => {
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
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los radiadores:", error);
        setLoading(false);
      }
    };

    fetchRadiators();
  }, [searchTerm]);

  return (
    <div>
      <RadiatorList title="Lista de Radiadores" radiators={radiators} onRadiatorSelect={onRadiatorSelect} />
    </div>
  );
};

export default RadiatorContainer;
