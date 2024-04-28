export class ProductCarModel {
    constructor({
        productId, carModelId, initialYear, lastYear, carModel,
         product
    }) {
        this.product = product;
        this.productId = productId;
        this.carModelId = carModelId;
        this.initialYear = initialYear;
        this.lastYear = lastYear;
        this.carModel = carModel;
    }
}