export default class Post {

    id: number;
    categoryId: number;
    title: string;
    content: string;

    constructor(id: number, categoryId: number,  title: string, content: string) {
        this.id = id;
        this.categoryId = categoryId;
        this.title = title;
        this.content = content;
    }
    get displayTitle(): string {
        return this.title;
    }
    get displayContent(): string {
        return this.content;
    }
    get getCategoryId(): number {
        return this.categoryId;
    }
    get getId(): number {
        return this.id;
    }
}
