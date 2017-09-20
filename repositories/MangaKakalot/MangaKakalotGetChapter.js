const superagent = require('superagent');
const AbstractGetChapterOperation = require('../../sdk/AbstractGetChapterOperation');
const PageHandle = require('../../sdk/PageHandle');
const Chapter = require('../../sdk/Chapter');
const HtmlToolkit = require('../HtmlToolkit');

module.exports = class MangaFoxGetChapter extends AbstractGetChapterOperation {
    getChapter(chapterHandle) {
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

    _getVolumeNumber($) {
        return HtmlToolkit.text($('#series strong').eq(0)).replace(/^v0*/, '');
    }

    _getChapterNumber($) {
        return HtmlToolkit.text($('#series h1').eq(0)).match(/.*?(\d+\.?\d*)$/)[1];
    }

    _buildPageUrl(chapterUrl, pageKey) {
        const match = chapterUrl.match(/^(.*mangafox\.me\/manga\/.*\/)[^/]*$/);
        if (!match) {
            throw new Error(`Failed to find base url in ${chapterUrl}`);
        }
        return `${match[1]}${pageKey}.html`;
    }
};
