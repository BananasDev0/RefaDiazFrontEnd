import File from "./File";

export default class ProductFile {
    constructor({ productId, fileId, file = {}}) {
        this.productId = productId;
        this.fileId = fileId;
        this.file = new File(file);
    }
}