import Brand from "./Brand";
import File from "./File";
import { ProductCarModel } from "./ProductCarModel";
import ProductPrice from "./ProductPrice";
import { ProviderProduct } from "./ProviderProduct";

export default class Product {
  constructor({ id, name, brand = {}, comments, stockCount, images, files = [], providers = [], prices = [], carModels = [], dpi = ''}) {
    this.id = id;
    this.name = name;
    this.brand = new Brand(brand);
    this.comments = comments;
    this.stockCount = stockCount;
    this.images = images;
    this.files = files.map(file => new File(file ?? {}));
    this.providers = providers.map(provider => new ProviderProduct(provider ?? {}));
    this.prices = prices.map(price => new ProductPrice(price ?? {}));
    this.carModels = carModels.map(carModel => new ProductCarModel(carModel ?? {}));
    this.dpi = dpi;
  }
}
