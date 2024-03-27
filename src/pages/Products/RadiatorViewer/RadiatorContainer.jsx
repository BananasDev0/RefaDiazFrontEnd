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

  console.log("estos son los radiadores: ", radiators)
  useEffect(() => {
    const fetchRadiators = async () => {
      try {
        const radiators = await getAllRadiators(searchTerm);
        console.log("estos son los radiadores: ", radiators)
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchOptionChange = (e) => {
    setSearchOption(e.target.value);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
        <Select
          value={searchOption}
          onChange={handleSearchOptionChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Buscar por' }}
          sx={{ height: '35px', marginRight: '5px' }}
        >
            <MenuItem value="marcas">Marcas</MenuItem>
          <MenuItem value="radiadores">Radiadores</MenuItem>
        </Select>
        <div style={{ flex: 1 }}>
          <CustomInput
            placeholder={`Buscar ${searchOption}...`}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <RadiatorList title="Lista de Radiadores" radiators={radiators} onRadiatorSelect={onRadiatorSelect} />
    </div>
  );
};

export default RadiatorContainer;