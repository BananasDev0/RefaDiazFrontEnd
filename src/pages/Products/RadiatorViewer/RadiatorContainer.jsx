import { useEffect, useState } from 'react';
import { getAllRadiators } from '../../../services/RadiatorService';
import { getImageURLFromStorage } from '../../../services/Firebase/storage';
import RadiatorList from './RadiatorList';

const RadiatorContainer = ({ onRadiatorSelect, searchTerm }) => {
  const [radiators, setRadiators] = useState([]);
  const [loading, setLoading] = useState(true); // Nuevo estado para controlar la carga

  useEffect(() => {
    const fetchRadiators = async () => {
      try {
        const radiatorsData = await getAllRadiators(searchTerm);

        // Obtener todas las imágenes en una sola operación y almacenarlas.
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
        setLoading(false); // Cambiar el estado de carga cuando los datos están cargados
      } catch (error) {
        console.error("Error al obtener los radiadores:", error);
        setLoading(false);
      }
    };

    fetchRadiators();
  }, [searchTerm]);

  return (
    <div>
      <RadiatorList title="Lista de Radiadores" radiators={radiators} onRadiatorSelect={onRadiatorSelect} loading={loading} />
    </div>
  );
};

export default RadiatorContainer;
