import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { STEP_VALIDATORS } from './validators';
import { useProductSelectionContext } from '../ProductSelectionContext';
import { DIALOG_STEPS, DIALOG_STEPS_ORDER } from './DialogSteps';
import { useProductDialogForm } from './ProductDialogFormContext';
import EventBus from '../../../services/EventBus';
import { DIALOG_EVENTS } from '../ProductDialogContext';

const ProductDialogNavigationContext = createContext();

export const useProductDialogNavigation = () => {
    const context = useContext(ProductDialogNavigationContext);
    if (!context) {
        throw new Error('useProductDialogNavigation must be used within a ProductDialogNavigationProvider');
    }
    return context;
};

export const ProductDialogNavigationProvider = ({ children }) => {
    const [currentStep, setCurrentStep] = useState(DIALOG_STEPS.BASIC_INFO);
    const [isNextEnabled, setIsNextEnabled] = useState(false);
    const { product } = useProductDialogForm();
    const { productType } = useProductSelectionContext();

    // Escuchar el evento de cierre del diálogo
    useEffect(() => {
       const unsubscribe = EventBus.on(DIALOG_EVENTS.CLOSE, () => {
        setCurrentStep(DIALOG_STEPS.BASIC_INFO);
       });

       return () => {
        unsubscribe();
       };   
    }, []);

    const validateCurrentStep = useCallback(() => {
        const stepValidators = STEP_VALIDATORS[currentStep];
        if (!stepValidators) return false;

        const validator = stepValidators[productType];
        if (!validator) return false;

        const isValid = validator(product);
        setIsNextEnabled(isValid);
        return isValid;
    }, [currentStep, product, productType]);

    const nextStep = useCallback(() => {
        const currentIndex = DIALOG_STEPS_ORDER.indexOf(currentStep);
        if (currentIndex < DIALOG_STEPS_ORDER.length - 1) {
            setCurrentStep(DIALOG_STEPS_ORDER[currentIndex + 1]);
            setIsNextEnabled(false); // Resetear el estado al cambiar de paso
        }
    }, [currentStep]);

    const previousStep = useCallback(() => {
        const currentIndex = DIALOG_STEPS_ORDER.indexOf(currentStep);
        if (currentIndex > 0) {
            setCurrentStep(DIALOG_STEPS_ORDER[currentIndex - 1]);
            validateCurrentStep(); // Revalidar el paso anterior
        }
    }, [currentStep, validateCurrentStep]);

    const value = {
        currentStep,
        setCurrentStep,
        isNextEnabled,
        validateCurrentStep,
        nextStep,
        previousStep
    };

    return (
        <ProductDialogNavigationContext.Provider value={value}>
            {children}
        </ProductDialogNavigationContext.Provider>
    );
}; 