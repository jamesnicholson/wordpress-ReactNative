export default class SearchResult {

    id: number;
    title: string;
    constructor(id: number,  title: string) {
        this.id = id;
        this.title = title;
    }
    get displayTitle(): string {
        return this.title;
    }
}
