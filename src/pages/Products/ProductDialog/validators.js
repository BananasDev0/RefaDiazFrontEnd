import { ProductTypes } from '../ProductsConstants';
import { DIALOG_STEPS } from './DialogSteps';

export const STEP_VALIDATORS = {
    [DIALOG_STEPS.BASIC_INFO]: {
        [ProductTypes.RADIATOR]: (product) => {
            return Boolean(
                product?.dpi &&
                product?.stockCount
            );
        },
        [ProductTypes.CAP]: () => {
            // TODO: Implementar validación para tapas
            return true;
        },
        [ProductTypes.FAN]: () => {
            // TODO: Implementar validación para abanicos
            return true;
        }
    },
    [DIALOG_STEPS.DETAILS]: {
        [ProductTypes.RADIATOR]: () => {
            return true;
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