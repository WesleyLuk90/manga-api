const cheerio = require('cheerio');
const TextParser = require('../repositories/TextParser');

describe('TextParser', () => {
    it('should get text from an element', () => {
        const $ = cheerio.load('<div>   \n   \n hello  world \n \n  </div>');
        expect(TextParser.create($).get()).toBe('hello  world');
    });

    it('should trim a prefix', () => {
        expect(TextParser.fromText('  summary: abcd ef').trimPrefix('summary:').get()).toBe('abcd ef');
    });

    it('should trim a regex prefix', () => {
        expect(TextParser.fromText('  summary: abcd ef').trimPrefix(/summary ?:/).get()).toBe('abcd ef');
    });

    it('should split a string', () => {
        expect(TextParser.fromText('a,b; c, d\n,\ne,').split(',', ';')).toEqual(['a', 'b', 'c', 'd', 'e']);
    });
});
