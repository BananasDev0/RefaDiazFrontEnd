export default class File {
    constructor({ id, name, mimeType, storagePath, orderId, fileData}) {
        this.id = id;
        this.name = name;
        this.mimeType = mimeType;
        this.storagePath = storagePath;
        this.orderId = orderId;
        this.fileData = fileData;
    }
}
