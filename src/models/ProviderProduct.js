import Price from "./Price";
import Provider from "./Provider";

export class ProviderProduct {
    constructor(providerId, productId, priceId, numSeries, price = {}, provider = {}) {
        this.providerId = providerId;
        this.productId = productId;
        this.priceId = priceId;
        this.numSeries = numSeries;
        this.price = new Price(price);
        this.provider = new Provider(provider);
    }
}