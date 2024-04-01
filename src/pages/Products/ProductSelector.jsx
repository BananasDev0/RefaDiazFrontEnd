import { useState } from 'react';
import BrandContainer from './BrandViewer/BrandContainer';
import VehicleList from './VehicleList';
import ProductSelectorNav from './ProductSelectorNav';
import RadiatorContainer from './RadiatorViewer/RadiatorContainer';
import CustomSearchBar from '../../components/CustomSearchBar';
import { CSSTransition } from 'react-transition-group';
import { CircularProgress } from '@mui/material';

const Screen = {
  BRANDS: 'BRANDS',
  VEHICLES: 'VEHICLES',
  RADIATORS: 'RADIATORS'
};

const ProductSelector = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [currentScreen, setCurrentScreen] = useState(Screen.BRANDS);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('marcas');
  const [loading, setLoading] = useState(false); // Nuevo estado para el cargador

  const handleBrandSelect = (brand) => {
    setSearchTerm('');
    setSelectedBrand(brand);
    setCurrentScreen(Screen.VEHICLES);
  };

  const handleVehicleModelSelect = (vehicle) => {
    setSearchTerm('');
    setSelectedVehicle(vehicle);
    setSearchOption('radiadores');
    setCurrentScreen(Screen.RADIATORS);
  };

  const handleBackToBrands = () => {
    setCurrentScreen(Screen.BRANDS);
    setSearchOption('marcas');
    setSelectedBrand(null);
    setSelectedVehicle(null);
  };

  const handleBackToVehicles = () => {
    setCurrentScreen(Screen.VEHICLES);
    setSelectedVehicle(null);
  };

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
  };

  const handleSearchOptionChange = (e) => {
    setSearchTerm('');
    setSelectedBrand(null);
    setSelectedVehicle(null);
    setSearchOption(e.target.value);
    if (e.target.value === 'marcas') {
      setCurrentScreen(Screen.BRANDS);
    } else {
      setCurrentScreen(Screen.RADIATORS);
    }
  };

  return (
    <div>
      <ProductSelectorNav
        selectedBrand={selectedBrand}
        selectedVehicle={selectedVehicle}
        onResetBrand={handleBackToBrands}
        onResetVehicle={handleBackToVehicles}
      />
      <CustomSearchBar
        searchOption={searchOption}
        searchTerm={searchTerm}
        handleSearchOptionChange={handleSearchOptionChange}
        handleSearchChange={handleSearchChange}
      />
      <CSSTransition
        in={currentScreen === Screen.BRANDS}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <BrandContainer
          onBrandSelect={handleBrandSelect}
          searchTerm={searchTerm}
          setLoading={setLoading} 
        />
      </CSSTransition>
      <CSSTransition
        in={currentScreen === Screen.RADIATORS}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <RadiatorContainer
          onRadiatorSelect={handleVehicleModelSelect}
          searchTerm={searchTerm}
          setLoading={setLoading} 
        />
      </CSSTransition>
      {currentScreen === Screen.VEHICLES && (
        <VehicleList
          brand={selectedBrand}
          onVehicleModelSelect={handleVehicleModelSelect}
        />
      )}

      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <CircularProgress size={40} />
        </div>
      )}
    </div>
  );
};

export default ProductSelector;
