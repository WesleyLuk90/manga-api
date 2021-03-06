const Request = require('../Request');
const TextParser = require('../TextParser');
const AbstractGetChapterOperation = require('../../sdk/operations/AbstractGetChapterOperation');
const PageHandle = require('../../sdk/PageHandle');
const Chapter = require('../../sdk/Chapter');

module.exports = class MangaFoxGetChapter extends AbstractGetChapterOperation {
    getChapter(chapterHandle) {
        return Request.get(chapterHandle.getUrl())
            .then((res) => {
                const $ = res.document;
                const pages = Array.from($('.vung-doc img'))
                    .map($)
                    .map(o => o.attr('src'))
                    .map(u => PageHandle.fromUrl(u));
                return new Chapter(chapterHandle)
                    .setTitle(TextParser.create($('h2').eq(0)).extract(/.* chapter \d+ : (.*)/).get())
                    .setChapter(TextParser.create($('h2').eq(0)).extract(/.* chapter (\d+)/).get())
                    .setPages(pages);
            });
    }
};
