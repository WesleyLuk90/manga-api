const MangaHandle = require('../sdk/MangaHandle');
const RepositoryListFactory = require('../repositories/RepositoryListFactory');

function download(url) {
    const list = RepositoryListFactory.create();
    const handle = MangaHandle.fromUrl(url);
    const repository = list.getRepositoryForHandle(handle);
    repository.getManga(handle)
        .then((manga) => {
            console.log(manga);
        });
}

download(process.argv[2]);
