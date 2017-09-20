const superagent = require('superagent');
const TextParser = require('../TextParser');
const AbstractGetChapterOperation = require('../../sdk/AbstractGetChapterOperation');
const PageHandle = require('../../sdk/PageHandle');
const Chapter = require('../../sdk/Chapter');

module.exports = class MangaFoxGetChapter extends AbstractGetChapterOperation {
    getChapter(chapterHandle) {
        return superagent.get(chapterHandle.getUrl())
            .then((res) => {
                const $ = res.document;
                const pages = Array.from($('.vung-doc img'))
                    .map($)
                    .map(o => o.attr('src'))
                    .map(u => PageHandle.fromUrl(u));
                return new Chapter(chapterHandle)
                    .setTitle(TextParser.create($('.info-top-chapter h2')).extract(/.* chapter \d+ : (.*)/).get())
                    .setChapter(TextParser.create($('.info-top-chapter h2')).extract(/.* chapter (\d+) :/).get())
                    .setPages(pages);
            });
    }
};
