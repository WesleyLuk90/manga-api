const lodash = require('lodash');
const Manga = require('../../sdk/Manga');
const TextParser = require('../TextParser');
const PagedMangaVisitor = require('../../sdk/PagedMangaVisitor');
const ChapterHandle = require('../../sdk/ChapterHandle');
const MangaEntry = require('../../sdk/MangaEntry');
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
        return this.httpClient.getDocument(`http://mangafox.la/releases/${index + 1}.htm`)
            .then(($) => {
                const mangaUpdates = $('#updates li');
                return lodash(mangaUpdates)
                    .map((update) => {
                        const manga = this.createManga($, update);
                        const chapters = Array.from($(update).find('.chapter a'))
                            .map(link => UrlNormalizer.fromAnchor($(link)).get());
                        return this.createChapterEntries(manga, chapters);
                    })
                    .flatten()
                    .value();
            });
    }

    createManga($, update) {
        const anchor = $(update).find('.title a');
        const mangaLink = UrlNormalizer.fromAnchor(anchor).get();
        const mangaName = TextParser.create(anchor).get();
        const manga = new Manga(MangaHandle.fromUrl(mangaLink)).setName(mangaName);
        return manga;
    }

    createChapterEntries(manga, chapters) {
        return chapters.map(chapterLink =>
            MangaEntry.create(manga)
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
MangaFoxMangaVisitor.$inject = ['HttpClient'];

module.exports = class MangaFoxListLatest extends AbstractListLatestOperation {
    listLatest() {
        return new MangaFoxMangaVisitor();
    }
};
