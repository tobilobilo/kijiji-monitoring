export function removeSubstring(substring: string, str: string): string {
    const reg = new RegExp(substring)
    return str.replace(reg, '')
}

export function readLocalStorage(name: string) {
    return localStorage.getItem(name);
}

export function deleteLocalStorage(name: string) {
    return localStorage.removeItem(name);
}

export function writeLocalStorageFeed(feedKeyword: string, feedUrl: string, checked: boolean) {
    const feeds = JSON.parse(localStorage.getItem("FEED") || "[]");
    feeds.push(
        {
            "keyword": feedKeyword,
            "url": feedUrl,
            "checked": checked
        }
    );
    localStorage.setItem("FEED", JSON.stringify(feeds));
    console.log(feeds);
}