import ModelManager from "./ModelManager";
import PriceManager from "./PriceManager";
import ProviderManager from "./ProviderManager";
import { useProductDialogNavigation } from "./ProductDialogNavigationContext";
import { DIALOG_STEPS } from "./DialogSteps";
import { useEffect } from "react";
import { useProductDialogForm } from "./ProductDialogFormContext";

const ProductDetails = () => {
  const { currentStep, validateCurrentStep } = useProductDialogNavigation();
  const { product } = useProductDialogForm();

  // Validar cuando el componente se monta, cuando cambia el paso actual o cuando se modifican los datos del producto
  useEffect(() => {
    if (currentStep === DIALOG_STEPS.DETAILS) {
      validateCurrentStep();
    }
  }, [currentStep, validateCurrentStep, product]);

  return (
    <>
      <ModelManager />
      <PriceManager />
      <ProviderManager />
    </>
  );
};

export default ProductDetails;
