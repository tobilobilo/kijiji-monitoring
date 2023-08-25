export interface Feed {
    keyword: string;
    url: string;
    checked: boolean;
}

export interface Profile {
    feeds: Array<Feed>;
    excludedTermsInTitle: Array<string>;
    excludedTermsInDescription: Array<string>;
}

export type AdsParser = {
    fetchedData: string;
    category: string;
    excludedTermsInTitle: Array<string>;
    excludedTermsInDescription: Array<string>;
}

export interface Ad {
    title?: string,
    description?: string,
    date?: string,
    link?: string,
    thumbnail?: string,
    category?: string,
    price?: string,
}

export interface Ads {
    [key: string]: Array<Ad>
}