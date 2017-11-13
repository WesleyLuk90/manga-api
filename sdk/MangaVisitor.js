/* eslint-disable no-unused-vars */
module.exports = class MangaVisitor {
    visit(visitor) {
        const doNext = () =>
            Promise.resolve()
            .then(() => this.next())
            .then((mangaEntry) => {
                if (mangaEntry == null) {
                    return null;
                }
                return Promise.resolve(visitor(mangaEntry))
                    .then((shouldContinue) => {
                        if (!shouldContinue) {
                            return null;
                        }
                        return doNext();
                    });
            });

        return doNext();
    }

    next() {
        throw new Error('Not Implemented');
    }
};
