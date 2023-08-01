import { create } from "zustand";
import { Profile } from "../interfaces";

interface ProfileStore extends Profile {
    updateProfile: () => void;
    loadProfile: (profile:Profile) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
    feeds: [],
    excludedTermsInDescription: [],
    excludedTermsInTitle: [],
    loadProfile: (profile:Profile) => 
        set((state) => ({
            ...state,
            feeds: [...profile.feeds, ],
            excludedTermsInDescription: [...profile.excludedTermsInDescription],
            excludedTermsInTitle: [...profile.excludedTermsInTitle],
        })),
    updateProfile: () => 
        set((state) => ({
            feeds: [...state.feeds, ...[{
                "url": "https://www.kijiji.ca/rss-srp-video-games-consoles/quebec/mario/k0c141l9001",
                "keyword": "mario2",
                "checked": false
              },
              {
                "url": "https://www.kijiji.ca/rss-srp-buy-sell/quebec/sega/k0c10l9001",
                "keyword": "sega2",
                "checked": false
              }]]
        })),
}))