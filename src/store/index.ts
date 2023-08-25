import { create } from "zustand";
import { Profile, Feed, Ad, Ads } from "../interfaces";
import { readLocalStorage } from "../utils/storage";
import { mergeWith, isArray } from 'lodash';

interface ProfileStore extends Profile {
    loadProfile: (profile:Profile) => void;
    setFeeds: (feeds:Array<Feed>) => void;
    addFeed: (feed:Feed) => void;
}

interface AdsStore {
    ads: Ads;
    ids: Array<string>,
    sortType: number,
    registerAds: (ads:Ads) => void;
    registerIds: (ids:Array<string>) => void;
    setSortType: (type: number) => void;
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

function customizer(objValue:Array<Ad>, srcValue:Array<Ad>) {
    if (isArray(objValue)) {
      return objValue.concat(srcValue);
    }
}

export const useAdsStore = create<AdsStore>((set) => ({
    ads: {},
    ids: [],
    sortType: 0,
    registerAds: (ads) =>  {
        set((state) => ({
            ads: {...mergeWith(state.ads, ads, customizer)}
        }))},
    registerIds: (ids) => 
        set((state) => ({
            ...state,
            ids: [...state.ids, ...ids],
        })),
    setSortType: (type) => 
        set((state) => ({
            ...state,
            sortType: type,
        })),
}))


