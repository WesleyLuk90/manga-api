const superagent = require('superagent');

const MangaRepository = require('../../sdk/MangaRepository');
const MangaHandle = require('../../sdk/MangaHandle');
const ChapterHandle = require('../../sdk/ChapterHandle');
const Capabilities = require('../../sdk/Capabilities');
const Manga = require('../../sdk/Manga');
const PageHandle = require('../../sdk/PageHandle');
const Chapter = require('../../sdk/Chapter');
const Page = require('../../sdk/Page');
const Fields = require('../../sdk/Fields');
const HtmlToolkit = require('../HtmlToolkit');
const Filters = require('../../sdk/Filters');

class MangaFox extends MangaRepository {

    getCapabilities() {
        return new Capabilities()
            .setSearchableFields([Fields.TITLE, Fields.ARTIST, Fields.AUTHOR])
            .setTagOptions([
                'Action',
                'Adult',
                'Adventure',
                'Comedy',
                'Doujinshi',
                'Drama',
                'Ecchi',
                'Fantasy',
                'Gender Bender',
                'Harem',
                'Historical',
                'Horror',
                'Josei',
                'Martial Arts',
                'Mature',
                'Mecha',
                'Mystery',
                'One Shot',
                'Psychological',
                'Romance',
                'School Life',
                'Sci-fi',
                'Seinen',
                'Shoujo',
                'Shoujo Ai',
                'Shounen',
                'Shounen Ai',
                'Slice of Life',
                'Smut',
                'Sports',
                'Supernatural',
                'Tragedy',
                'Webtoons',
                'Yaoi',
                'Yuri',
            ])
            .setFilterByIncludingTags(true)
            .setFilterByExcludingTags(true);
    }

    search(filters, options) {
        if (filters) {
            this._checkFilters(filters);
        }
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

    listLatest() {
        return this.search();
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
                    .setPages(pages)
                    .setChapter(this._getChapterNumber($))
                    .setVolume(this._getVolumeNumber($));
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


    isForHandle(handle) {
        return !!handle.url.match(/^http:\/\/mangafox\.me\//);
    }

    _normalizeChapterUrl(url) {
        if (url.match(/1\.html$/)) {
            return url;
        }
        return `${url}1.html`;
    }

    _getVolumeNumber($) {
        return HtmlToolkit.text($('#series strong').eq(0)).replace(/^v0*/, '');
    }

    _getChapterNumber($) {
        return HtmlToolkit.text($('#series h1').eq(0)).match(/.*(\d+\.?\d*)$/)[1];
    }

    _buildPageUrl(chapterUrl, pageKey) {
        const match = chapterUrl.match(/^(.*mangafox\.me\/manga\/.*\/)[^/]*$/);
        if (!match) {
            throw new Error(`Failed to find base url in ${chapterUrl}`);
        }
        return `${match[1]}${pageKey}.html`;
    }

    _buildSearch(filters) {
        filters = filters || new Filters();
        const url = 'http://mangafox.me/search.php';
        const released = {
            released_method: 'eq',
            released: '',
            rating_method: 'eq',
            rating: '',
            is_completed: '',
            advopts: '1',
            sort: 'last_chapter_time',
            order: 'za',
        };
        const searchMethod = {
            name_method: 'cw',
            name: filters.getSearchField(Fields.TITLE),
            type: '',
            author_method: 'cw',
            author: filters.getSearchField(Fields.AUTHOR),
            artist_method: 'cw',
            artist: filters.getSearchField(Fields.ARTIST),
        };
        const genres = {
            genres: {},
        };
        this.getCapabilities().getTagOptions().forEach((option) => {
            if (filters.hasIncludedTag(option)) {
                genres.genres[option] = '1';
            } else if (filters.hasExcludedTag(option)) {
                genres.genres[option] = '2';
            } else {
                genres.genres[option] = '0';
            }
        });
        return superagent.get(url)
            .query(searchMethod)
            .query(genres)
            .query(released);
    }
}

module.exports = MangaFox;
