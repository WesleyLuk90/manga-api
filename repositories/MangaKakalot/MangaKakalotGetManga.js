const superagent = require('superagent');
const ChapterHandle = require('../../sdk/ChapterHandle');
const Manga = require('../../sdk/Manga');
const HtmlToolkit = require('../HtmlToolkit');
const AbstractGetMangaOperation = require('../../sdk/AbstractGetMangaOperation');

module.exports = class MangaFoxGetManga extends AbstractGetMangaOperation {
    getManga(mangaHandle) {
        return superagent.get(mangaHandle.getUrl())
            .then((res) => {
                const $ = res.document;
                const links = $('.chapter-list .row span:nth-child(1) a');
                const chapters = Array.from(links)
                    .map(link => $(link).attr('href'))
                    .map(link => ChapterHandle.fromUrl(link))
                    .reverse();
                return new Manga(mangaHandle)
                    .setChapters(chapters)
                    .setSummary(HtmlToolkit.text($('#noidungm')))
                    .setStatus(HtmlToolkit.text($('.manga-info-text li')[2]).match(/Status : (.*)/)[1])
                    .setPreviewImageUrl($('.manga-info-pic img').attr('src'))
                    .setName(HtmlToolkit.text($('.manga-info-text h1')));
            });
    }
};
