export default class Post {

    postId: number;
    categoryId: number;
    title: string;
    content: string;

    constructor(postId: number, categoryId: number,  title: string, content: string) {
        this.postId = postId;
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
        return this.postId;
    }
}
