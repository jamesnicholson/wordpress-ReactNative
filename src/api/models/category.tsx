export default class Category {
    id?: number;
    name: string;
    count: number;

    constructor(id: number, name: string, count: number){
        this.id = id;
        this.name = name;
        this.count = count;
    }
    get displayName(): string {
        return this.name;
    }
    get getCount(): number {
        return this.count;
    }
}