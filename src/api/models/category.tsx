export default class Category {
    categoryId: number;
    name: string;
    image: string;
    count: number;
    type: string;
    parent: number;

    constructor(categoryId: number, name: string, type: string, image: string, count: number, parent: number){
        this.name = name;
        this.type = type;
        this.count = count;
        this.image = image;
        this.parent = parent;
        this.categoryId = categoryId;
    }
    get displayTitle(): string {
        return this.name;
    }
    get getCount(): number {
        return this.count;
    }
    get getImage(): string {
        return this.image;
    }
    get getType(): string {
        return this.type;
    }
    get getParent(): number {
        return this.parent;
    }
    get getCategoryId(): number {
        return this.categoryId;
    }
    get getId(): number {
        return this.categoryId;
    }
}