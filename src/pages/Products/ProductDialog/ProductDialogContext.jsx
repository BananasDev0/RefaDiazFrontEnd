import { createContext, useContext, useEffect, useState } from 'react';
import { processRadiatorData } from '../../../services/RadiatorService';
import { ProductVehicleModel } from '../../../models/ProductVehicleModel';
import ProductPrice from '../../../models/ProductPrice';
import Price from '../../../models/Price';
import { useProductsContext } from '../ProductsContext';

const ProductDialogContext = createContext();

export const useProductDialogContext = () => useContext(ProductDialogContext);

export const ProductDialogProvider = ({ children }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [isNextEnabled, setIsNextEnabled] = useState(false);
    const [product, setProduct] = useState({ product: {} });
    const [associatedVehicleModels, setAssociatedVehicleModels] = useState([])
    const [associatedPrices, setAssociatedPrices] = useState([]);
    const { productType } = useProductsContext();
    const dependencies = [productType, associatedVehicleModels,
        associatedPrices, product.product.stockCount, product.product.comments, product.dpi];

    const [images, setImages] = useState([]);

    const handleImageUpload = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImages(prevImages => [...prevImages, reader.result]);
        };
        reader.readAsDataURL(file);
    };

    const handleImageDelete = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    useEffect(() => {
        const formattedName = formatProductName(productType, product, associatedVehicleModels, associatedPrices);
        setProduct(currentProduct => ({
            ...currentProduct,
            product: {
                ...currentProduct.product,
                name: formattedName
            }
        }));
    }, dependencies);


    const formatProductName = (productType, product, vehicleModels) => {
        switch (productType) {
            case 'radiadores':
                return `${product.dpi} ${vehicleModels.map(vm => `${vm.model.name} (${vm.startYear}-${vm.endYear})`).join('-')} [${product.product.stockCount}]`;
            default:
                return product.product.name; // Devuelve el nombre existente si el tipo de producto no coincide
        }
    };


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
    };

    const handleSubmit = (productType) => {
        let vehicleModels = associatedVehicleModels.map(vehicleModel => {
            return new ProductVehicleModel({
                vehicleModelId: vehicleModel.model.id,
                initialYear: vehicleModel.startYear,
                lastYear: vehicleModel.endYear
            });

        });

        let prices = associatedPrices.map(price => {
            return new ProductPrice({
                price: new Price({
                    description: price.description,
                    cost: price.cost
                })
            });
        });

        switch (productType) {
            case 'radiadores':
                processRadiatorData(product, vehicleModels, prices);
                break
        }
    }

    return (
        <ProductDialogContext.Provider value={{
            activeStep,
            setActiveStep,
            handleNext,
            handleBack,
            isNextEnabled,
            setIsNextEnabled,
            totalSteps: 3,
            product,
            setProduct,
            associatedVehicleModels,
            setAssociatedVehicleModels,
            handleSubmit,
            associatedPrices,
            setAssociatedPrices,
            images,
            handleImageUpload,
            handleImageDelete
        }}>
            {children}
        </ProductDialogContext.Provider>
    );
};
