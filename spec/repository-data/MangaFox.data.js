const _ = require('lodash');

module.exports = {
    manga_tests: [{
        handle: 'http://mangafox.me/manga/a_love_for_sweet_things/',
        results: {
            name: 'A Love for Sweet Things',
            altNames: [
                '甘いのがお好き',
                'Amai no ga Osuki',
            ],
            releaseYear: '1998',
            authors: ['Hinata Mahiru'],
            artists: ['Hinata Mahiru'],
            genres: ['Comedy', 'Romance', 'Shoujo'],
            summary: 'Her entire family likes them. her friends like them, all the girls she knows likes them... but to Suguri, sweets are the worst! Just the mere smell of them induces her to vomit! So what is she supposed to do when she discovers that her crush, Murakami Ken, who supposedly hates them, is obsessed with them? He begs her to not tell anyone of his secret infatuation with sweets because it would ruin his \'manly\' image and she agrees as long as he let\'s her work with him at the famous Igloo Bakery! Love sparks, rivals appear! See how Suguri overcomes her sugary malice in A Love for Sweet Things!',
            status: 'Completed',
            previewImageUrl: 'http://h.mfcdn.net/store/manga/446/cover.jpg?v=1313938466',
            chapters: [
                'http://mangafox.me/manga/a_love_for_sweet_things/v01/c001/1.html',
                'http://mangafox.me/manga/a_love_for_sweet_things/v01/c002/1.html',
                'http://mangafox.me/manga/a_love_for_sweet_things/v01/c003/1.html',
            ],
        },
    }],
    chapter_tests: [{
        handle: 'http://mangafox.me/manga/a_love_for_sweet_things/v01/c001/1.html',
        results: {
            chapter: '1',
            volume: '1',
            title: '',
            pages: _.range(1, 52 + 1).map(n => `http://mangafox.me/manga/a_love_for_sweet_things/v01/c001/${n}.html`),
        },
    }],
    page_tests: [{
        handle: 'http://mangafox.me/manga/a_love_for_sweet_things/v01/c001/1.html',
        results: {
            imageUrl: 'http://h.mfcdn.net/store/manga/446/01-001.0/compressed/BQlogo.jpg',
        },
    }],
};