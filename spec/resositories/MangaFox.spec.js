const MangaFox = require('../../repositories/MangaFox/MangaFox');
const url = require('url');
const Fields = require('../../sdk/Fields');
const Filters = require('../../sdk/Filters');
const qs = require('qs');

describe('MangaFox', () => {
    describe('query formatter', () => {
        let mangaFox;
        beforeEach(() => {
            mangaFox = new MangaFox();
        });

        function createExpectedQuery(values) {
            const defaults = {
                name_method: 'cw',
                name: '',
                type: '',
                author_method: 'cw',
                author: '',
                artist_method: 'cw',
                artist: '',
                'genres[Action]': '0',
                'genres[Adult]': '0',
                'genres[Adventure]': '0',
                'genres[Comedy]': '0',
                'genres[Doujinshi]': '0',
                'genres[Drama]': '0',
                'genres[Ecchi]': '0',
                'genres[Fantasy]': '0',
                'genres[Gender Bender]': '0',
                'genres[Harem]': '0',
                'genres[Historical]': '0',
                'genres[Horror]': '0',
                'genres[Josei]': '0',
                'genres[Martial Arts]': '0',
                'genres[Mature]': '0',
                'genres[Mecha]': '0',
                'genres[Mystery]': '0',
                'genres[One Shot]': '0',
                'genres[Psychological]': '0',
                'genres[Romance]': '0',
                'genres[School Life]': '0',
                'genres[Sci-fi]': '0',
                'genres[Seinen]': '0',
                'genres[Shoujo]': '0',
                'genres[Shoujo Ai]': '0',
                'genres[Shounen]': '0',
                'genres[Shounen Ai]': '0',
                'genres[Slice of Life]': '0',
                'genres[Smut]': '0',
                'genres[Sports]': '0',
                'genres[Supernatural]': '0',
                'genres[Tragedy]': '0',
                'genres[Webtoons]': '0',
                'genres[Yaoi]': '0',
                'genres[Yuri]': '0',
                released_method: 'eq',
                released: '',
                rating_method: 'eq',
                rating: '',
                is_completed: '',
                advopts: '1',
                sort: 'last_chapter_time',
                order: 'za',
            };
            return Object.assign(defaults, values);
        }

        function testSearch(filter, expectedValues) {
            const request = mangaFox._buildSearch(filter);
            const urlObject = {
                pathname: request.url,
                search: qs.stringify(request.qs),
            };
            const formattedUrl = url.format(urlObject);
            const parsedUrl = url.parse(formattedUrl, true);

            expect(parsedUrl.pathname).toBe('/search.php');
            const expectedQuery = createExpectedQuery(expectedValues);
            const queryKeys = Object.keys(expectedQuery);
            expect(queryKeys.length > 0).toBe(true);
            queryKeys.forEach((key) => {
                expect(`${key}: ${parsedUrl.query[key]}`).toEqual(`${key}: ${expectedQuery[key]}`);
            });
        }
        it('should query with no filter', () => {
            testSearch(null, null);
        });
        it('should filter by including tag', () => {
            const tagFilter = mangaFox.getCapabilities().getTagOptions()[0];
            const expectedQuery = {};
            expectedQuery[`genres[${tagFilter}]`] = '1';
            testSearch(new Filters().setIncludedTags([tagFilter]), expectedQuery);
        });
        it('should filter by excluding tags', () => {
            const tagFilter = mangaFox.getCapabilities().getTagOptions()[0];
            const expectedQuery = {};
            expectedQuery[`genres[${tagFilter}]`] = '2';
            testSearch(new Filters().setExcludedTags([tagFilter]), expectedQuery);
        });
        it('should filter by name', () => {
            const expectedQuery = {
                name: 'something',
            };
            testSearch(new Filters().setSearchField(Fields.TITLE, 'something'), expectedQuery);
        });
        it('should filter by author', () => {
            const expectedQuery = {
                author: 'something',
            };
            testSearch(new Filters().setSearchField(Fields.AUTHOR, 'something'), expectedQuery);
        });
        it('should filter by artist', () => {
            const expectedQuery = {
                artist: 'something',
            };
            testSearch(new Filters().setSearchField(Fields.ARTIST, 'something'), expectedQuery);
        });
    });
    it('should generate page urls', () => {
        const mangaFox = new MangaFox();

        const expected = 'http://mangafox.me/manga/white_epic/c060/5.html';

        expect(mangaFox._buildPageUrl('http://mangafox.me/manga/white_epic/c060/5.html', '5')).toBe(expected);
        expect(mangaFox._buildPageUrl('http://mangafox.me/manga/white_epic/c060/', '5')).toBe(expected);

        expect(mangaFox._buildPageUrl('http://mangafox.me/manga/white_epic/c060/v10/', '5')).toBe('http://mangafox.me/manga/white_epic/c060/v10/5.html');
    });
    it('should provide capabilities', () => {
        const mangaFox = new MangaFox();
        const cap = mangaFox.getCapabilities();

        expect(cap.getSearchableFields()).toContain(Fields.TITLE);
        expect(cap.getSearchableFields()).toContain(Fields.AUTHOR);
        expect(cap.getSearchableFields()).toContain(Fields.ARTIST);

        const options = cap.getTagOptions();
        options.sort();
        expect(options).toEqual([
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
        ]);
    });
});
