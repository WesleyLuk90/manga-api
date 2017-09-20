const lodash = require('lodash');

module.exports = {
    manga_tests: [{
        handle: 'http://mangakakalot.com/manga/evil_meal/',
        results: {
            name: 'Evil Meal',
            altNames: ['Jakimeshi'],
            authors: ['Kayase Shiki'],
            status: 'Completed',
            genres: ['Fantasy', 'Josei', 'One shot', 'Supernatural'],
            summary: 'Yuuki has a problem: evil spirits are attracted to him. But one day, he meets a kid that can devour those evil spirits for him. Yuuki’s not sure whether that’s a good thing or a bad thing…',
            previewImageUrl: 'http://s2.mgicdn.com/avatar/19732-evil_meal.jpg',
            chapters: [
                'http://mangakakalot.com/chapter/evil_meal/chapter_1',
            ],
        },
    }, {
        handle: 'http://manganel.com/manga/black_clover',
        results: {
            name: 'Black Clover',
            altNames: [],
            authors: ['Tabata Yuuki'],
            status: 'Ongoing',
            genres: ['Action', 'Adult', 'Comedy', 'Fantasy', 'Sci fi', 'Shounen', 'Supernatural'],
            summary: () => {},
            chapters: {
                96: 'http://manganel.com/chapter/black_clover/chapter_96',
            },
        },
    }],
    chapter_tests: [{
        handle: 'http://mangakakalot.com/chapter/evil_meal/chapter_1',
        results: {
            title: 'One Shot',
            chapter: '1',
            pages: lodash.range(15).map(i => `http://3.p.mpcdn.net/50441/1104811/${i + 1}.jpg`),
        },
    }],
    page_tests: [{
        handle: 'http://3.p.mpcdn.net/50441/1104811/15.jpg',
        results: {
            imageUrl: 'http://3.p.mpcdn.net/50441/1104811/15.jpg',
        },
    }],
};
