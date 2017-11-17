const lodash = require('lodash');
const Manga = require('../../sdk/Manga');
const MangaHandle = require('../../sdk/MangaHandle');
const MangaEntry = require('../../sdk/MangaEntry');
const PagedMangaVisitor = require('../../sdk/PagedMangaVisitor');

describe('PagedMangaVisitor', () => {
    function makeEntry(i) {
        return MangaEntry.create(new Manga(MangaHandle.fromUrl(String(i))));
    }

    class TestPagedMangaVisitor extends PagedMangaVisitor {
        getPage(i) {
            return Promise.resolve([
                lodash.range(5).map(makeEntry),
                lodash.range(4, 7).map(makeEntry), [],
            ][i]);
        }
    }

    it('should visit all manga', () => {
        const visitor = new TestPagedMangaVisitor();

        const values = [];
        return visitor.visit((i) => {
                values.push(i);
                return true;
            })
            .then(() => {
                expect(values).toEqual([...lodash.range(5).map(makeEntry),
                    makeEntry(5),
                    makeEntry(6),
                ]);
            });
    });
});
