import { useEffect, useState } from 'react';
import { getAllRadiators } from '../../../services/RadiatorService';
import { getImageURLFromStorage } from '../../../services/Firebase/storage';
import { CSSTransition } from 'react-transition-group'; // Importa CSSTransition
import RadiatorList from './RadiatorList';
import '../../../styles/brandContainer.css';
import { useSnackbar } from '../../../components/SnackbarContext';

const RadiatorContainer = ({ onRadiatorSelect, searchTerm, setLoading }) => {
  const [radiators, setRadiators] = useState([]);
  const { openSnackbar } = useSnackbar();

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
        openSnackbar(`Error al cargar los radiadores!: ${error.errorMessage}`, 'error')
      }
    };

    fetchRadiators();
  }, [searchTerm, setLoading]);

  return (
    <CSSTransition
      in={radiators.length > 0} // Establece la condición para mostrar la animación
      timeout={300} 
      classNames="fade" 
      unmountOnExit 
    >
      <div>
        <RadiatorList title="Lista de Radiadores" radiators={radiators} onRadiatorSelect={onRadiatorSelect} />
      </div>
    </CSSTransition>
  );
};

export default RadiatorContainer;
