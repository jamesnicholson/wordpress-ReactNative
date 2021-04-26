export default class Category {
    id?: number;
    name: string;
    image: string;
    count: number;

    constructor(id: number, name: string, image: string, count: number){
        this.id = id;
        this.name = name;
        this.count = count;
        this.image = image;
    }
    get displayName(): string {
        return this.name;
    }
    get getCount(): number {
        return this.count;
    }
    get getImage(): string {
        return this.image;
    }
}