import File from "./File";

export default class Brand {
    constructor({ id, name, brandTypeId, file = {}}) {
        this.id = id;
        this.name = name;
        this.brandTypeId = brandTypeId;
        this.file = new File(file || {});
    }
}
