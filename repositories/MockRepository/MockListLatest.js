const lodash = require('lodash');
const Manga = require('../../sdk/Manga');
const AbstractListLatestOperation = require('../../sdk/operations/AbstractListLatestOperation');
const MangaHandle = require('../../sdk/MangaHandle');
const ChapterHandle = require('../../sdk/ChapterHandle');
const MangaEntry = require('../../sdk/MangaEntry');
const PagedMangaVisitor = require('../../sdk/PagedMangaVisitor');

function makeEntry(i) {
    return MangaEntry.create(Manga.create(MangaHandle.fromUrl(`mock://manga/${i}`)))
        .setChapterHandle(i % 2 === 0 ? null : ChapterHandle.fromUrl(`mock://chapter/${i}`));
}

class MockPagedMangaVisitor extends PagedMangaVisitor {
    getPage(i) {
        return Promise.resolve(lodash()
            .range(100)
            .map(makeEntry)
            .chunk(30)
            .value()[i]);
    }
}

module.exports = class MockListLatest extends AbstractListLatestOperation {
    listLatest() {
        return new MockPagedMangaVisitor();
    }
};
