export default class Category {

    id?: number;
    name: string;

    constructor(name: string, id?: number){
        this.name = name;
        this.id = id;
    }
    get displayName(): string {
        return this.name;
    }
}