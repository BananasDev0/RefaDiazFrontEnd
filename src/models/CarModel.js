import Brand from "./Brand";

export default class CarModel {
    constructor({id, name, brand = {}, brandId}) {
        this.id = id;
        this.name = name;
        this.brandId = brandId;
        this.brand = new Brand(brand);
    }
}