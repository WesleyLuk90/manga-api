const Request = require('../Request');
const UrlNormalizer = require('../UrlNormalizer');
const AbstractSearchOperation = require('../../sdk/operations/AbstractSearchOperation');
const MangaHandle = require('../../sdk/MangaHandle');
const Fields = require('../../sdk/Fields');
const MangaFoxCapabilitiesOperation = require('./MangaFoxCapabilitiesOperation');

module.exports = class MangaFoxSearch extends AbstractSearchOperation {
    search(filters, options) {
        return this._buildSearch(filters, options)
            .then((res) => {
                const $ = res.document;
                const links = $('#mangalist li a.title');
                return Array.from(links)
                    .map(link => UrlNormalizer.fromAnchor($(link)).get())
                    .map(link => MangaHandle.fromUrl(link));
            });
    }

    _buildSearch(filters) {
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
        new MangaFoxCapabilitiesOperation().getCapabilities().getTagOptions().forEach((option) => {
            if (filters.hasIncludedTag(option)) {
                genres.genres[option] = '1';
            } else if (filters.hasExcludedTag(option)) {
                genres.genres[option] = '2';
            } else {
                genres.genres[option] = '0';
            }
        });
        return Request.get(url)
            .query(searchMethod)
            .query(genres)
            .query(released);
    }
};
