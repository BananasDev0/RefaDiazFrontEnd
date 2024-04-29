import CarModel from "./CarModel";
import Product from "./Product";

export class ProductCarModel {
    constructor({
        productId, carModelId, initialYear, lastYear, carModel = {},
         product = {}
    }) {
        this.product = new Product(product);
        this.productId = productId;
        this.carModelId = carModelId;
        this.initialYear = initialYear;
        this.lastYear = lastYear;
        this.carModel = new CarModel(carModel);
    }
}