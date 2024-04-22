export default class Product {
  constructor({ id, name, brand, imageUrl, comments, stockCount }) {
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.imageUrl = imageUrl;
    this.comments = comments;
    this.stockCount = stockCount;
  }
}
