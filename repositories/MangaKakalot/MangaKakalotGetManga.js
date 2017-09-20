const superagent = require('superagent');
const TextParser = require('../TextParser');
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
                    .setAltNames(TextParser.create($('.story-alternative')).trimPrefix(/Alternative :/).split(';'))
                    .setSummary(TextParser.create($('#noidungm')).trimPrefix(/.*? summary:/).get())
                    .setAuthors(TextParser.create($('.manga-info-text li').eq(1)).trimPrefix('Author(s) :').split(','))
                    .setGenres(TextParser.create($('.manga-info-text li').eq(6)).trimPrefix('Genres :').split(','))
                    .setStatus(TextParser.create($('.manga-info-text li').eq(2)).trimPrefix('Status :').get())
                    .setPreviewImageUrl($('.manga-info-pic img').attr('src'))
                    .setName(HtmlToolkit.text($('.manga-info-text h1')));
            });
    }
};
