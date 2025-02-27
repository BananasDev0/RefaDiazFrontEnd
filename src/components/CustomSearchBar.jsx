import React, { useState, useEffect, useCallback } from 'react';
import { Select, MenuItem } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomInput from './CustomInput';
import { useSelectionContext } from '../pages/Products/SelectionContext';
import { useSearchContext } from '../pages/Products/SearchContext';
import { ProductTypesNamesEsp, SearchOptions } from '../pages/Products/ProductsConstants';
import { PATHS } from '../constants/paths';

const CustomSearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productType, clearSelection } = useSelectionContext();
  const { searchTerm, setSearchTerm, searchOption, handleSearchOptionChange } = useSearchContext();
  const [placeholder, setPlaceholder] = useState('');

  // Memoizar las funciones para evitar re-renderizados innecesarios
  const handleSearchChange = useCallback((e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
  }, [setSearchTerm]);

  const handleOptionChange = useCallback((option) => {
    let path;
    switch (option) {
      case SearchOptions.BRANDS:
        path = PATHS.BRANDS;
        break;
      case SearchOptions.MODELS:
        path = PATHS.MODELS;
        break;
      case SearchOptions.PRODUCTS:
        path = PATHS.PRODUCTS_LIST;
        break;
      default:
        return;
    }
    clearSelection(path)
    navigate(path);
  }, [handleSearchOptionChange, navigate]);

  // Actualizar placeholder basado en searchOption y productType
  useEffect(() => {
    const productVerbiage = ProductTypesNamesEsp[productType] || 'Productos';
    switch (searchOption) {
      case SearchOptions.BRANDS:
        setPlaceholder('Buscar marcas...');
        break;
      case SearchOptions.MODELS:
        setPlaceholder('Buscar modelos...');
        break;
      default:
        setPlaceholder(`Buscar ${productVerbiage.toLowerCase()}...`);
    }
  }, [searchOption, productType]);

  // Actualizar searchOption basado en la ruta actual (sin handleSearchOptionChange en dependencias)
  useEffect(() => {
    const updateSearchOptionFromRoute = (pathname) => {
      let newSearchOption;
      if (pathname == PATHS.BRANDS) {
        newSearchOption = SearchOptions.BRANDS;
      } else if (pathname == PATHS.MODELS) {
        newSearchOption = SearchOptions.MODELS;
      } else if (pathname == PATHS.PRODUCTS_LIST) {
        newSearchOption = SearchOptions.PRODUCTS;
      }
      if (newSearchOption && newSearchOption !== searchOption) {
        handleSearchOptionChange(newSearchOption);
      }
    };
    updateSearchOptionFromRoute(location.pathname);
  }, [location.pathname]); // Solo location.pathname como dependencia

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
        <MenuItem value={SearchOptions.PRODUCTS}>{ProductTypesNamesEsp[productType] || 'Productos'}</MenuItem>
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

export default React.memo(CustomSearchBar, () => true);