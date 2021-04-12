export default class Category {

    id?: number;
    name: string;

    constructor(id: number, name: string){
        this.name = name;
        this.id = id;
    }
    get displayName(): string {
        return this.name;
    }
}