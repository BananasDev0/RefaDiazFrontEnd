export default class File {
    constructor({ id, name, mimeType, storagePath, orderId, fileData, fileTypeId}) {
        this.id = id;
        this.name = name;
        this.mimeType = mimeType;
        this.storagePath = storagePath;
        this.orderId = orderId;
        this.fileData = fileData;
        this.fileTypeId = fileTypeId;
    }
}
