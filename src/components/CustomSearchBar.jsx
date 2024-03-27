import { Select, MenuItem } from '@mui/material';
import CustomInput from "./CustomInput";

const CustomSearchBar = ({ searchOption, searchTerm, handleSearchOptionChange, handleSearchChange }) => {
  return (
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
  );
};

export default CustomSearchBar;
