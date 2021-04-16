export default interface ISearchResult {
    id:      number;
    title:   string;
    url:     string;
    type:    Type;
    subtype: Type;
    _links:  Links;
}

export interface Links {
    self:       Self[];
    about:      About[];
    collection: About[];
}

export interface About {
    href: string;
}

export interface Self {
    embeddable: boolean;
    href:       string;
}

export enum Type {
    Post = "post",
}
