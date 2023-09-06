import { describe, expect, it } from "vitest";
import { removeSubstring, containsTerms } from "../string"

describe("#removeSubstring", () => {
    it("The substring has been removed from the string", () => {
        expect(removeSubstring('les ', 'Allo les cocos')).toBe('Allo cocos');
    });
});

describe("#containsTerms", () => {
    it("Search for a string element in an array of strings", () => {
        expect(containsTerms('Cat', ['Hello', 'yo', 'cat', 'hell', 'sos', 'Canada'])).toBe(true);
        expect(containsTerms('hel', ['Hello', 'yo', 'cat', 'hell', 'sos', 'Canada'])).toBe(false);
        expect(containsTerms('CANADA', ['Hello', 'yo', 'cat', 'hell', 'sos', 'Canada'])).toBe(true);
    });
});