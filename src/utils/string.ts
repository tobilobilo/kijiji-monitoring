export function removeSubstring(substring: string, str: string): string {
    const reg = new RegExp(substring)
    return str.replace(reg, '')
}

export function containsTerms(text: string, terms: string[]): boolean {
    if (terms.some(term => text.toLowerCase().includes(term.toLowerCase()))) {
        return true;
    }
    return false;
}