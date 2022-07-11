const words = require('./words.js') as string[]

export function getWordsByLength (length: number): string[] {
    return words.filter(x => x.length === length)
}