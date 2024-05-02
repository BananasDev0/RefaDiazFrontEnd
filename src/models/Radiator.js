import Product from "./Product";

export default class Radiator {
  constructor({dpi, product = {}}) {
    this.dpi = dpi;
    this.product = new Product(product);
  }
}
