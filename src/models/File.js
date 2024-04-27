export default class File {
    constructor({ id, name, mimeType, storagePath }) {
        this.id = id;
        this.name = name;
        this.mimeType = mimeType;
        this.storagePath = storagePath;
    }
}
