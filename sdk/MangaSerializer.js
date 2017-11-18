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
            chapters: manga.getChapters().map(c => ChapterHandle.serialize(c)),
            type: manga.getType(),
            tags: manga.getTags(),
        };
    }

    static deserialize(json) {
        const data = JSON.parse(json);
        return new Manga(MangaHandle.deserialize(data.mangaHandle))
            .setName(data.name)
            .setAltNames(data.altNames)
            .setChapters(data.chapters.map(c => ChapterHandle.deserialize(c)))
            .setType(data.type)
            .setTags(data.tags);
    }
};
