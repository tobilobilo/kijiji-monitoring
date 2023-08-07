import { Feed } from "../interfaces";

export function readLocalStorage(name: string) {
    return localStorage.getItem(name);
}

export function deleteLocalStorage(name: string) {
    return localStorage.removeItem(name);
}

export function writeLocalStorageFeed(feed:Feed) {
    const feeds = JSON.parse(localStorage.getItem("CUSTOM_FEEDS") || "[]");
    feeds.push(feed);
    localStorage.setItem("CUSTOM_FEEDS", JSON.stringify(feeds));
}