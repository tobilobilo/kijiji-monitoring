export interface Feed {
    url: string;
    keyword: string;
    checked: boolean;
}

export interface Profile {
    feeds: Array<Feed>;
    excludedTermsInTitle: Array<string>;
    excludedTermsInDescription: Array<string>;
}

export interface Add {
    id: string,
    title: string,
    description?: string,
    pubDate: string,
    link: string,
    thumbnail?: string,
    category: string,
    price?: string,
}