export default class Post {

    id?: number;
    title: string;

    constructor(title: string, id?: number){
        this.title = title;
        this.id = id;
    }
    get displayTitle(): string {
        return this.title;
    }
}
