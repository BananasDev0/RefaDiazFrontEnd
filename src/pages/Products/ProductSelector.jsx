import { useState } from 'react';
import BrandContainer from './BrandViewer/BrandContainer';
import VehicleList from './VehicleList';
import ProductSelectorNav from './ProductSelectorNav';
import RadiatorContainer from './RadiatorViewer/RadiatorContainer';
import CustomSearchBar from '../../components/CustomSearchBar';


const ProductSelector = () => {
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [showBrands, setShowBrands] = useState(true);
    const [showVehicles, setShowVehicles] = useState(false);
    const [showRadiators, setShowRadiators] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [searchOption, setSearchOption] = useState('marcas');

    const showVehiclesScreen = () => {
        setShowVehicles(true);
        setShowBrands(false);
        setShowRadiators(false);
    }

    const showBrandsScreen = () => {
        setShowVehicles(false);
        setShowBrands(true);
        setShowRadiators(false);
    }

    const showRadiatorsScreen = () => {
        setShowVehicles(false);
        setShowBrands(false);
        setShowRadiators(true);
    }

    const handleBrandSelect = (brand) => {
        setSelectedBrand(brand);
        showVehiclesScreen();
    };

    const handleVehicleModelSelect = (vehicle) => {
        setSelectedVehicle(vehicle);
        showRadiatorsScreen();
    };

    const handleBackToBrands = () => {
        showBrandsScreen();
        setSelectedBrand(null);
        setSelectedVehicle(null);
    };

    const handleBackToVehicles = () => {
        showVehiclesScreen();
        setSelectedVehicle(null);
    };

    const handleSearchChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);

        if (searchOption == 'marcas') {
            showBrandsScreen();
        } else {
            showRadiatorsScreen();
        }
    };

    const handleSearchOptionChange = (e) => {
        setSearchOption(e.target.value);
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
            {showBrands && <BrandContainer onBrandSelect={handleBrandSelect} searchTerm={searchTerm}/>}
            {showVehicles && <VehicleList brand={selectedBrand} onVehicleModelSelect={handleVehicleModelSelect}></VehicleList>}
            {showRadiators && <RadiatorContainer></RadiatorContainer>}
        </div>
    );
};

export default ProductSelector;