import { beforeEach, describe, expect, it, expectTypeOf } from "vitest";
import { writeLocalStorageFeed, readLocalStorage, deleteLocalStorage } from "../storage";
import { Feed } from "../../interfaces";
import feedJSON from "../../../public/data/mocks/feed1.json";

const feed:Feed = feedJSON;

describe("localStorage processing", () => {
    beforeEach(() => {
        localStorage.clear()
    });
    
    it("Set feeds in localStorage", () => {
        expect(writeLocalStorageFeed("", feed)).toBe(false);
        expect(readLocalStorage("NOTSTORAGE")).toBe(null);
        expect(deleteLocalStorage("NOTSTORAGE")).toBe(undefined);

        expect(writeLocalStorageFeed("TESTLOCAL", feed));
        expectTypeOf(readLocalStorage("TESTLOCAL")).toMatchTypeOf<string>;
        expect(deleteLocalStorage("TESTLOCAL")).toBe(undefined);
    })
});