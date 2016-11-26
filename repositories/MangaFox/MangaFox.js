const superagent = require('superagent');

const MangaRepository = require('../../sdk/MangaRepository');
const MangaHandle = require('../../sdk/MangaHandle');
const ChapterHandle = require('../../sdk/ChapterHandle');
const Capabilities = require('../../sdk/Capabilities');
const Manga = require('../../sdk/Manga');
const PageHandle = require('../../sdk/PageHandle');
const Chapter = require('../../sdk/Chapter');
const Page = require('../../sdk/Page');

class MangaFox extends MangaRepository {

    getCapabilities() {
        return new Capabilities();
    }

    search(filters, options) {
        return this._buildSearch(filters, options)
            .then((res) => {
                const $ = res.document;
                const links = $('#listing tr td:first-child a');
                return Array.from(links)
                    .map(link => MangaHandle.fromUrl($(link).attr('href')));
            });
    }

    getManga(mangaHandle) {
        this._checkMangaHandle(mangaHandle);

        return superagent.get(mangaHandle.getUrl())
            .then((res) => {
                const $ = res.document;
                const links = $('a.tips');
                const chapters = Array.from(links)
                    .map(link => ChapterHandle.fromUrl($(link).attr('href')));

                return new Manga(mangaHandle)
                    .setChapters(chapters);
            });
    }

    getChapter(chapterHandle) {
        this._checkChapterHandle(chapterHandle);

        return superagent.get(chapterHandle.getUrl())
            .then((res) => {
                const $ = res.document;
                const select = $('select.m').eq(0);
                const options = select.find('option');
                const pages = Array.from(options)
                    .map($)
                    .filter(o => o.attr('value') !== '0')
                    .map(o => o.attr('value'))
                    .map(v => this._buildPageUrl(chapterHandle.getUrl(), v))
                    .map(u => PageHandle.fromUrl(u));

                return new Chapter(chapterHandle)
                    .setPages(pages);
            });
    }

    getPage(pageHandle) {
        this._checkPageHandle(pageHandle);

        return superagent.get(pageHandle.getUrl())
            .then((res) => {
                const $ = res.document;
                return new Page(pageHandle)
                    .setImageUrl($('#image').attr('src'));
            });
    }

    _buildPageUrl(chapterUrl, pageKey) {
        const match = chapterUrl.match(/^(.*mangafox\.me\/manga\/.*\/)[^/]*$/);
        if (!match) {
            throw new Error(`Failed to find base url in ${chapterUrl}`);
        }
        return `${match[1]}${pageKey}.html`;
    }

    _buildSearch(filters, options) {
        const url = 'http://mangafox.me/search.php';
        const released = {
            released_method: 'eq',
            released: '',
            rating_method: 'eq',
            rating: '',
            is_completed: '',
            advopts: '1',
        };
        const searchMethod = {
            name_method: 'cw',
            name: '',
            type: '',
            author_method: 'cw',
            author: '',
            artist_method: 'cw',
            artist: '',
        };
        const genres = {
            genres: {
                Action: 0,
                Adult: 0,
                Adventure: 0,
                Comedy: 0,
                Doujinshi: 0,
                Drama: 0,
                Ecchi: 0,
                Fantasy: 0,
                'Gender Bender': 0,
                Harem: 0,
                Historical: 0,
                Horror: 0,
                Josei: 0,
                'Martial Arts': 0,
                Mature: 0,
                Mecha: 0,
                Mystery: 0,
                'One Shot': 0,
                Psychological: 0,
                Romance: 0,
                'School Life': 0,
                'Sci-fi': 0,
                Seinen: 0,
                Shoujo: 0,
                'Shoujo Ai': 0,
                Shounen: 0,
                'Shounen Ai': 0,
                'Slice of Life': 0,
                Smut: 0,
                Sports: 0,
                Supernatural: 0,
                Tragedy: 0,
                Webtoons: 0,
                Yaoi: 0,
                Yuri: 0,
            },
        };
        return superagent.get(url)
            .query(searchMethod)
            .query(genres)
            .query(released);
    }
}

module.exports = MangaFox;
