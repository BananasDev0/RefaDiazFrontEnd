export default class File {
    constructor({ id, name, mimeType, storagePath, orderId }) {
        this.id = id;
        this.name = name;
        this.mimeType = mimeType;
        this.storagePath = storagePath;
        this.orderId = orderId;
    }
}
