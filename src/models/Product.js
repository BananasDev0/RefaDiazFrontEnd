export default class Product {
  constructor({ id, name, brand, comments, stockCount, images, productFiles }) {
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.comments = comments;
    this.stockCount = stockCount;
    this.images = images;
    this.productFiles = productFiles;
  }
}
