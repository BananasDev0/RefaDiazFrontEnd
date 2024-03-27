import { useState } from 'react';
import BrandContainer from './BrandViewer/BrandContainer';
import VehicleList from './VehicleList';
import ProductSelectorNav from './ProductSelectorNav';
import RadiatorList from './RadiatorViewer/RadiatorList';


const ProductSelector = () => {
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [showBrands, setShowBrands] = useState(true);
    const [showVehicles, setShowVehicles] = useState(false);
    const [showRadiators, setShowRadiators] = useState(false);

    const handleBrandSelect = (brand) => {
        setSelectedBrand(brand);
        setShowBrands(false);
        setShowVehicles(true);
        setShowRadiators(false); // Asegurarse de que la selección de radiadores se resetee
    };

    const handleVehicleModelSelect = (vehicle) => {
        setSelectedVehicle(vehicle);
        setShowVehicles(false);
        setShowRadiators(true);
    };

    const handleBackToBrands = () => {
        setShowBrands(true);
        setShowVehicles(false);
        setShowRadiators(false);
        setSelectedBrand(null);
        setSelectedVehicle(null);
    };

    const handleBackToVehicles = () => {
        setShowBrands(false);
        setShowVehicles(true);
        setShowRadiators(false);
        setSelectedVehicle(null);
    };

    return (
        <div>
            <ProductSelectorNav
                selectedBrand={selectedBrand}
                selectedVehicle={selectedVehicle}
                onResetBrand={handleBackToBrands}
                onResetVehicle={handleBackToVehicles}
            />
            {showBrands && <BrandContainer onBrandSelect={handleBrandSelect} />}
            {showVehicles && selectedBrand && <VehicleList brand={selectedBrand} onVehicleModelSelect={handleVehicleModelSelect}></VehicleList>}
            {showRadiators && selectedVehicle && <RadiatorList></RadiatorList>} {/* Aquí iría el componente de lista de radiadores */}
        </div>
    );
};

export default ProductSelector;