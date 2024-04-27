import { useState } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import BrandContainer from './BrandViewer/BrandContainer';
import ProductSelectorNav from './ProductSelectorNav';
import RadiatorContainer from './RadiatorViewer/RadiatorContainer';
import CustomSearchBar from '../../components/CustomSearchBar';
import VehicleModelListContainer from './VehicleModelViewer/VehicleModelContainer';
import { useProductsContext } from './ProductsContext';

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
    const [loading, setLoading] = useState(false);
    const { setSelectedProduct, handleOpenDialog } = useProductsContext();

    const handleBrandSelect = (e, brand) => {
        setSearchTerm('');
        setSelectedBrand(brand);
        setCurrentScreen(Screen.VEHICLES);
    };

    const handleVehicleModelSelect = (e, vehicle) => {
        setSearchTerm('');
        setSelectedVehicle(vehicle);
        setSearchOption('radiadores');
        setCurrentScreen(Screen.RADIATORS);
    };

    const handleProductSelect = (e, product) => {
        console.log("mmmh", product)
        setSelectedProduct(product);
        handleOpenDialog(true);
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
        } else if (e.target.value === 'vehiculos') {
            setCurrentScreen(Screen.VEHICLES);
        } else {
            setCurrentScreen(Screen.RADIATORS);
        }
    };

    return (
        <>
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

            <Box sx={{ height: 'calc(100vh - 320px)', overflowY: 'auto' }}>
                {currentScreen === Screen.BRANDS && <BrandContainer onBrandSelect={handleBrandSelect} searchTerm={searchTerm} setLoading={setLoading} />}
                {currentScreen === Screen.VEHICLES && <VehicleModelListContainer brand={selectedBrand} onVehicleModelSelect={handleVehicleModelSelect} setLoading={setLoading} searchTerm={searchTerm} />}
                {currentScreen === Screen.RADIATORS && <RadiatorContainer vehicleModel={selectedVehicle} onRadiatorSelect={handleProductSelect} searchTerm={searchTerm} setLoading={setLoading} />}

                {loading && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                        <CircularProgress size={40} />
                    </div>
                )}
            </Box>
        </>
    );
};

export default ProductSelector;
