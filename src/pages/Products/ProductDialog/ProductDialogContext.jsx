import { createContext, useContext, useState } from 'react';

const ProductDialogContext = createContext();

export const useProductDialogContext = () => useContext(ProductDialogContext);

export const ProductDialogProvider = ({ children }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [isNextEnabled, setIsNextEnabled] = useState(false);
    const [product, setProduct] = useState({ product: {}});
    const [associatedVehicleModels, setAssociatedVehicleModels] = useState([])

    console.log(product)
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
    };

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
            setAssociatedVehicleModels
        }}>
            {children}
        </ProductDialogContext.Provider>
    );
};
