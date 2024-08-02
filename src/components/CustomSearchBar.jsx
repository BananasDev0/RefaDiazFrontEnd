import { Select, MenuItem } from '@mui/material';
import CustomInput from "./CustomInput";
import { useProductsContext } from '../pages/Products/ProductsContext';
import { SearchOptions } from '../pages/Products/ProductsConstants';
import BrandContainer from '../pages/Products/BrandViewer/BrandContainer';
import CarModelListContainer from '../pages/Products/ModelViewer/CarModelContainer';
import ProductContainer from '../pages/Products/ProductViewer/ProductContainer';
import { getProductVerbiage } from '../util/generalUtils';

const CustomSearchBar = ({ navigate }) => {
  const { searchOption, searchTerm, handleSearchOptionChange, setSearchTerm, productType } = useProductsContext();
  
  let placeholder = '';
  let productVerbiage = getProductVerbiage(productType);

  if (searchOption === SearchOptions.BRANDS) {
    placeholder = 'Buscar marcas...';
  } else if (searchOption === SearchOptions.MODELS) {
    placeholder = 'Buscar modelos...';
  } else {
    placeholder = `Buscar ${productVerbiage}...`;
  }

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
  }

  const handleOptionChange = (option) => {
    handleSearchOptionChange(option);

    switch (option) {
      case SearchOptions.BRANDS:
        navigate(<BrandContainer />, 'Marcas');
        break;
      case SearchOptions.MODELS:
        navigate(<CarModelListContainer />, 'Modelos');
        break;
      case SearchOptions.PRODUCTS:
        navigate(<ProductContainer />, productVerbiage);
        break;
      default:
        break;
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
      <Select
        value={searchOption}
        onChange={(event) => handleOptionChange(event.target.value)}
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