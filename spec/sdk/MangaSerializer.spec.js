const Manga = require('../../sdk/Manga');
const ChapterHandle = require('../../sdk/ChapterHandle');
const MangaHandle = require('../../sdk/MangaHandle');
const MangaSerializer = require('../../sdk/MangaSerializer');

describe('MangaSerializer', () => {
    it('should serialize round trip', () => {
        const testCases = [
            new Manga(MangaHandle.fromUrl('test:url'))
                .setChapters([
                    ChapterHandle.fromUrl('abc'),
                    ChapterHandle.fromUrl('abc'),
                ]),
            new Manga(MangaHandle.fromUrl('handle')),
            Manga.create(MangaHandle.fromUrl('handle'))
                .setName('some name')
                .setPreviewImageUrl('http://url'),
            null,
        ];
        testCases.forEach((testCase) => {
            const data = MangaSerializer.serialize(testCase);
            const newManga = MangaSerializer.deserialize(data);
            expect(newManga).toEqual(testCase);
        });
    });
});
