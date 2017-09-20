const bluebird = require('bluebird');
const path = require('path');
const superagent = require('superagent');
const MangaHandle = require('../sdk/MangaHandle');
const RepositoryListFactory = require('../repositories/RepositoryListFactory');
const fs = require('fs');

const mkdir = function mkdir(dir) {
    return bluebird.promisify(fs.mkdir)(dir)
        .catch(() => {});
};

function escape(fragment) {
    return fragment.replace(/^a-z0-9 _-/gi, '-');
}

const list = RepositoryListFactory.create();

class Downloader {
    constructor(url) {
        this.url = url;
        this.handle = MangaHandle.fromUrl(url);
        this.repository = list.getRepositoryForHandle(this.handle);
        this.base = path.join(process.cwd(), 'download');
    }

    download() {
        return this.repository.getManga(this.handle)
            .then(manga => bluebird.mapSeries(manga.getChapters(), h => this.downloadChapter(h)));
    }

    downloadChapter(chapterHandle) {
        return this.repository.getChapter(chapterHandle)
            .then((chapter) => {
                console.log(`Downloading ${chapter.generateDescription()}`);
                return this.makeFolder(chapter)
                    .then(() => bluebird.mapSeries(chapter.getPages(),
                        (page, index) => this.downloadPage(chapter, page, index)));
            });
    }

    downloadPage(chapter, pageHandle, index) {
        return this.repository.getPage(pageHandle)
            .then(page => this.downloadFile(chapter, page.getImageUrl(), index));
    }

    downloadFile(chapter, url, index) {
        const target = path.join(this.getChapterPath(chapter), `${index + 1}.jpg`);
        const outputFile = fs.createWriteStream(target);

        const download = superagent.get(url);
        download.pipe(outputFile);
        return this.wrapStream(download);
    }

    wrapStream(stream) {
        return new Promise((res, rej) => {
            stream.on('end', res);
            stream.on('error', rej);
        });
    }

    getChapterPath(chapter) {
        return path.join(this.base, escape(chapter.generateDescription()));
    }

    makeFolder(chapter) {
        return mkdir(this.base)
            .then(() => mkdir(this.getChapterPath(chapter)));
    }
}

process.on('uncaughtException', (err) => {
    console.log(err);
});

new Downloader(process.argv[2]).download()
    .then(() => console.log('done'), e => console.error(e));
