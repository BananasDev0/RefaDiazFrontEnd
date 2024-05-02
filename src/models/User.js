import Person from "./Person";

export default class User {
    constructor({ id, person = {}, roleId, role = {}}) {
        this.id = id;
        this.person = new Person(person);
        this.roleId = roleId;
        this.role = role
    }
}