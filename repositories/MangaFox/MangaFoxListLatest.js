const lodash = require('lodash');
const PagedMangaVisitor = require('../../sdk/PagedMangaVisitor');
const ChapterHandle = require('../../sdk/ChapterHandle');
const MangaEntry = require('../../sdk/MangaEntry');
const Request = require('../Request');
const MangaHandle = require('../../sdk/MangaHandle');
const UrlNormalizer = require('../UrlNormalizer');
const AbstractListLatestOperation = require('../../sdk/operations/AbstractListLatestOperation');

class MangaFoxMangaVisitor extends PagedMangaVisitor {
    constructor() {
        super();
        this.lastResults = null;
        this.index = 0;
    }

    getPage(index) {
        return Request.get(`http://mangafox.me/releases/${index + 1}.htm`)
            .then((res) => {
                const $ = res.document;
                const mangaUpdates = $('#updates li');
                return lodash(mangaUpdates)
                    .map((update) => {
                        const manga = UrlNormalizer.fromAnchor($(update).find('.title a')).get();
                        const chapters = Array.from($(update).find('.chapter a'))
                            .map(link => UrlNormalizer.fromAnchor($(link)).get());
                        return this.createChapterEntries(manga, chapters);
                    })
                    .flatten()
                    .value();
            });
    }

    createChapterEntries(manga, chapters) {
        return chapters.map(chapterLink =>
            MangaEntry.create(MangaHandle.fromUrl(manga))
            .setChapterHandle(ChapterHandle.fromUrl(chapterLink)));
    }

    getMangaEntries($) {
        const mangaUpdates = $('.updates li');
        return lodash(mangaUpdates)
            .map(link => UrlNormalizer.fromAnchor($(link)).get())
            .map(link => MangaHandle.fromUrl(link))
            .map(handle => MangaEntry.create(handle));
    }
}

module.exports = class MangaFoxListLatest extends AbstractListLatestOperation {
    listLatest() {
        return new MangaFoxMangaVisitor();
    }
};
