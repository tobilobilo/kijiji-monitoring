import { create } from "zustand";
import { Profile, Feed, Ad } from "../interfaces";
import { readLocalStorage } from "../utils/storage";

interface ProfileStore extends Profile {
    loadProfile: (profile:Profile) => void;
    setFeeds: (feeds:Array<Feed>) => void;
    addFeed: (feed:Feed) => void;
}

interface AdsStore {
    ads: Array<Ad>,
    urls: Array<string>,
    registerAds: (ads:Array<Ad>) => void;
    registerUrls: (urls:Array<string>) => void;
}

const customFeeds = readLocalStorage("CUSTOM_FEEDS");
const parsedCustomFeeds = (customFeeds) ? JSON.parse(customFeeds) : [];

export const useProfileStore = create<ProfileStore>((set) => ({
    feeds: [],
    excludedTermsInDescription: [],
    excludedTermsInTitle: [],
    loadProfile: (profile:Profile) => 
        set((state) => ({
            ...state,
            feeds: [...profile.feeds, ...parsedCustomFeeds],
            excludedTermsInDescription: [...profile.excludedTermsInDescription],
            excludedTermsInTitle: [...profile.excludedTermsInTitle],
        })),
    setFeeds: (feeds) => 
        set((state) => ({
            ...state,
            feeds: [...feeds],
        })),
    addFeed: (feed) => 
        set((state) => ({
            ...state,
            feeds: [...state.feeds, feed],
        })),
}))

export const useAdsStore = create<AdsStore>((set) => ({
    ads: [],
    urls: [],
    registerAds: (ads) => 
        set((state) => ({
            ...state,
            ads: [...state.ads, ...ads],
        })),
    registerUrls: (urls) => 
        set((state) => ({
            ...state,
            urls: [...state.urls, ...urls],
        }))
}))


