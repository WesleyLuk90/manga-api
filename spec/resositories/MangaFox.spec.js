const MangaFox = require('../../repositories/MangaFox/MangaFox');
const url = require('url');

describe('MangaFox', () => {
    it('should format the url', (done) => {
        const mangaFox = new MangaFox();
        const expectedQuery = {
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

        mangaFox._buildSearch()
            .then((response) => {
                const parsedUrl = url.parse(response.req.path, true);
                expect(parsedUrl.pathname).toEqual('/search.php');
                Object.keys(parsedUrl.query).forEach((key) => {
                    expect(`${key}: ${parsedUrl.query[key]}`).toEqual(`${key}: ${expectedQuery[key]}`);
                });
            })
            .catch(fail)
            .then(done);
    });
    it('should generate page urls', () => {
        const mangaFox = new MangaFox();

        const expected = 'http://mangafox.me/manga/white_epic/c060/5.html';

        expect(mangaFox._buildPageUrl('http://mangafox.me/manga/white_epic/c060/5.html', '5')).toBe(expected);
        expect(mangaFox._buildPageUrl('http://mangafox.me/manga/white_epic/c060/', '5')).toBe(expected);

        expect(mangaFox._buildPageUrl('http://mangafox.me/manga/white_epic/c060/v10/', '5')).toBe('http://mangafox.me/manga/white_epic/c060/v10/5.html');
    });
});
