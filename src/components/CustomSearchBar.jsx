import { Select, MenuItem } from '@mui/material';
import CustomInput from "./CustomInput";
import { useProductsContext } from '../pages/Products/ProductsContext';
import { ProductTypes, SearchOptions } from '../pages/Products/ProductsConstants';

const CustomSearchBar = () => {
  const { searchOption, searchTerm, handleSearchOptionChange, setSearchTerm, productType } = useProductsContext();

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
  }

  let placeholder = '';
  let productVerbiage = 'Radiadores';

  if (productType === ProductTypes.CAP) {
    productVerbiage = 'Tapas';
  } else if (productType === ProductTypes.FAN) {
    productVerbiage = 'Abanicos';
  }

  if (searchOption === SearchOptions.BRANDS) {
    placeholder = 'Buscar marcas...';
  } else if (searchOption === SearchOptions.MODELS) {
    placeholder = 'Buscar modelos...';
  } else {
    placeholder = `Buscar ${productVerbiage}...`;
  }


  return (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
      <Select
        value={searchOption}
        onChange={(event) => handleSearchOptionChange(event.target.value)}
        displayEmpty
        inputProps={{ 'aria-label': 'Buscar por' }}
        sx={{ height: '35px', marginRight: '5px' }}
      >
        <MenuItem value={SearchOptions.BRANDS}>Marcas</MenuItem>
        <MenuItem value={SearchOptions.MODELS}>Modelos</MenuItem>
        <MenuItem value={SearchOptions.PRODUCTS}>{productVerbiage}</MenuItem>
      </Select>
      <div style={{ flex: 1 }}>
        <CustomInput
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

export default CustomSearchBar;