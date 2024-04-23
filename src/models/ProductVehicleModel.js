export class ProductVehicleModel {
    constructor({
        productId, vehicleModelId, initialYear, lastYear, vehicleModel
    }) {
        this.productId = productId;
        this.vehicleModelId = vehicleModelId;
        this.initialYear = initialYear;
        this.lastYear = lastYear;
        this.vehicleModel = vehicleModel;
    }
}