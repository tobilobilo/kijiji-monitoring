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