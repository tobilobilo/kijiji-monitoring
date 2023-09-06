import { Feed } from "../interfaces";

export function readLocalStorage(name: string) {
    return localStorage.getItem(name);
}

export function deleteLocalStorage(name: string) {
    return localStorage.removeItem(name);
}

export function writeLocalStorageFeed(name: string, feed:Feed) {
    if(name === "") return false;
    const feeds = JSON.parse(localStorage.getItem(name) || "[]");
    feeds.push(feed);
    localStorage.setItem(name, JSON.stringify(feeds));
}