import { useState, useEffect } from 'react';
import { Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomInput from "./CustomInput";
import { useProductsContext } from '../pages/Products/ProductsContext';
import { ProductTypes, ProductTypesNamesEsp, SearchOptions } from '../pages/Products/ProductsConstants';

const CustomSearchBar = () => {
  const navigate = useNavigate();
  const { searchOption, searchTerm, handleSearchOptionChange, setSearchTerm, productType, setSearchOption } = useProductsContext();
  const [placeholder, setPlaceholder] = useState('');

  useEffect(() => {
    const productVerbiage = ProductTypesNamesEsp[productType];
    switch (searchOption) {
      case SearchOptions.BRANDS:
        setPlaceholder('Buscar marcas...');
        break;
      case SearchOptions.MODELS:
        setPlaceholder('Buscar modelos...');
        break;
      default:
        setPlaceholder(`Buscar ${productVerbiage}...`);
    }
  }, [searchOption, productType]);

  useEffect(() => {
    const updateSearchOptionFromRoute = (pathname) => {
      let newSearchOption;
      if (pathname.includes('/brands')) {
        newSearchOption = SearchOptions.BRANDS;
      }

      if (pathname.includes('/models')) {
        newSearchOption = SearchOptions.MODELS;
      }

      if (pathname.includes('/radiators') || pathname.includes('/caps') || pathname.includes('/fans')) {
        newSearchOption = SearchOptions.PRODUCTS;
      }

      if (newSearchOption) {
        setSearchOption(newSearchOption);
      }
    };

    updateSearchOptionFromRoute(location.pathname);
  }, [location.pathname, setSearchOption]);

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
  }

  const handleOptionChange = (option) => {
    handleSearchOptionChange(option);
    let path;
    switch (option) {
      case SearchOptions.BRANDS:
        path = '/home/products/brands';
        break;
      case SearchOptions.MODELS:
        path = '/home/products/brands/models';
        break;
      case SearchOptions.PRODUCTS:
        if (productType === ProductTypes.RADIATOR) path = '/home/products/brands/models/radiators';
        if (productType === ProductTypes.CAP) path = '/home/products/brands/models/caps';
        break;
      default:
        return;
    }
    navigate(path);
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
        <MenuItem value={SearchOptions.PRODUCTS}>{ProductTypesNamesEsp[productType]}</MenuItem>
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