import { ProductTypes } from '../ProductsConstants';
import { DIALOG_STEPS } from './DialogSteps';

export const STEP_VALIDATORS = {
    [DIALOG_STEPS.BASIC_INFO]: {
        [ProductTypes.RADIATOR]: (product) => {
            return Boolean(
                product?.dpi &&
                product?.stockCount
            );
        }
    },
    [DIALOG_STEPS.DETAILS]: {
        [ProductTypes.RADIATOR]: (product) => {
            return Boolean(
                product?.carModels &&
                product?.carModels.length > 0
            );
        }
    },
    [DIALOG_STEPS.SUBMIT]: {
        [ProductTypes.RADIATOR]: (product) => {
            return Boolean(
                product?.price &&
                product?.cost &&
                Number(product.price) > Number(product.cost)
            );
        }
    }
}; 