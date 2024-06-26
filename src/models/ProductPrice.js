import Price from "./Price";

export default class ProductPrice {
    constructor({productId, priceId, price = {}}) {
        this.productId = productId;
        this.priceId = priceId;
        this.price = new Price(price);
    }
}