export function removeSubstring(substring: string, str: string): string {
    const reg = new RegExp(substring)
    return str.replace(reg, '')
}