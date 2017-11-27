const assert = require('assert');
const ChapterHandle = require('./ChapterHandle');
const MangaHandle = require('./MangaHandle');
const Manga = require('./Manga');

module.exports = class MangaSerializer {
    static serialize(manga) {
        return JSON.stringify(MangaSerializer.toObject(manga));
    }

    static toObject(manga) {
        if (!manga) {
            return null;
        }
        assert(manga instanceof Manga);
        return {
            mangaHandle: MangaHandle.serialize(manga.getMangaHandle()),
            name: manga.getName(),
            altNames: manga.getAltNames(),
            chapters: !manga.chapters ? manga.chapters : manga.getChapters().map(c => ChapterHandle.serialize(c)),
            type: manga.getType(),
            tags: manga.getTags(),
            previewImageUrl: manga.getPreviewImageUrl(),
        };
    }

    static deserialize(json) {
        assert.equal(typeof json, 'string');
        const data = JSON.parse(json);
        if (data == null) {
            return null;
        }
        return Manga.builder()
            .setMangaHandle(MangaHandle.deserialize(data.mangaHandle))
            .setName(data.name)
            .setAltNames(data.altNames)
            .setChapters(!data.chapters ? data.chapters : data.chapters.map(c => ChapterHandle.deserialize(c)))
            .setType(data.type)
            .setTags(data.tags)
            .setPreviewImageUrl(data.previewImageUrl)
            .create();
    }
};
