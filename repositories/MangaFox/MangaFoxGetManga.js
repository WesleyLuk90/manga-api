const superagent = require('superagent');
const UrlNormalizer = require('../UrlNormalizer');
const ChapterHandle = require('../../sdk/ChapterHandle');
const Manga = require('../../sdk/Manga');
const HtmlToolkit = require('../HtmlToolkit');
const AbstractGetMangaOperation = require('../../sdk/AbstractGetMangaOperation');

module.exports = class MangaFoxGetManga extends AbstractGetMangaOperation {
    getManga(mangaHandle) {
        return superagent.get(mangaHandle.getUrl())
            .then((res) => {
                const $ = res.document;
                const links = $('a.tips');
                const chapters = Array.from(links)
                    .map(link => $(link).attr('href'))
                    .map(link => this._normalizeChapterUrl(link))
                    .map(link => ChapterHandle.fromUrl(link))
                    .reverse();
                return new Manga(mangaHandle)
                    .setChapters(chapters)
                    .setAltNames($('#title h3').text().split(';').map(a => a.trim()))
                    .setReleaseYear(HtmlToolkit.text($('#title tr:nth-child(2) td:nth-child(1)')))
                    .setAuthors(HtmlToolkit.textArray($('#title tr:nth-child(2) td:nth-child(2) a')))
                    .setArtists(HtmlToolkit.textArray($('#title tr:nth-child(2) td:nth-child(3) a')))
                    .setGenres(HtmlToolkit.textArray($('#title tr:nth-child(2) td:nth-child(4) a')))
                    .setSummary(HtmlToolkit.text($('p.summary')))
                    .setStatus(HtmlToolkit.text($('div.data span')[0]))
                    .setPreviewImageUrl($('.cover img').attr('src'))
                    .setName($('meta[property="og:title"]').attr('content').match(/(.*) Manga/)[1]);
            });
    }

    _normalizeChapterUrl(url) {
        return UrlNormalizer
            .create(url)
            .ensureSuffix('1.html')
            .get();
    }
};
