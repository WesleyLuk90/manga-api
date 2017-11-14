const ChapterHandle = require('../../sdk/ChapterHandle');
const MangaHandle = require('../../sdk/MangaHandle');
const MangaEntry = require('../../sdk/MangaEntry');

describe('MangaEntry', () => {
    const entryA1 = MangaEntry.create(MangaHandle.fromUrl('A'));
    const entryA2 = MangaEntry.create(MangaHandle.fromUrl('A'));
    const entryB = MangaEntry.create(MangaHandle.fromUrl('B'));
    const entryAC1 = MangaEntry.create(MangaHandle.fromUrl('A'))
        .setChapterHandle(ChapterHandle.fromUrl('C'));
    const entryAC2 = MangaEntry.create(MangaHandle.fromUrl('A'))
        .setChapterHandle(ChapterHandle.fromUrl('C'));
    const entryBC = MangaEntry.create(MangaHandle.fromUrl('B'));

    it('should check for equality', () => {
        const testCases = [
            {
                left: entryA1,
                right: entryA2,
            },
            {
                left: entryA1,
                right: entryA1,
            },
            {
                left: entryAC1,
                right: entryAC2,
            },
            {
                left: entryAC1,
                right: entryAC1,
            },

        ];
        testCases.forEach((testCase) => {
            expect(MangaEntry.equals(testCase.left, testCase.right)).toBe(true);
        });
    });

    it('should check for inequality', () => {
        const testCases = [
            {
                left: entryA1,
                right: entryB,
            },
            {
                left: entryA1,
                right: null,
            },
            {
                left: entryA1,
                right: entryAC2,
            },
            {
                left: entryAC2,
                right: entryBC,
            },
            {
                left: entryA1,
                right: null,
            },

        ];

        testCases.forEach((testCase) => {
            expect(MangaEntry.equals(testCase.left, testCase.right)).toBe(false);
        });
    });

    it('should serialize and deserialize', () => {
        expect(MangaEntry.deserialize(entryA1.serialize())).toEqual(entryA1);
        expect(MangaEntry.deserialize(entryAC1.serialize())).toEqual(entryAC1);
    });
});
