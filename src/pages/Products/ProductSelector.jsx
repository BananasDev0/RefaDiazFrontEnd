import { useState } from 'react';
import BrandContainer from './BrandViewer/BrandContainer';
import VehicleList from './VehicleList';
import ProductSelectorNav from './ProductSelectorNav';
import RadiatorContainer from './RadiatorViewer/RadiatorContainer';
import CustomSearchBar from '../../components/CustomSearchBar';

// Enumeración para las diferentes pantallas
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
            {currentScreen === Screen.BRANDS && <BrandContainer onBrandSelect={handleBrandSelect} searchTerm={searchTerm}/>}
            {currentScreen === Screen.VEHICLES && <VehicleList brand={selectedBrand} onVehicleModelSelect={handleVehicleModelSelect} />}
            {currentScreen === Screen.RADIATORS && <RadiatorContainer onRadiatorSelect={handleVehicleModelSelect} searchTerm={searchTerm} />}
        </div>
    );
};

export default ProductSelector;
