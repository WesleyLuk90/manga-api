const Capabilities = require('../../sdk/Capabilities');
const Fields = require('../../sdk/Fields');
const AbstractCapabilitiesOperation = require('../../sdk/operations/AbstractCapabilitiesOperation');

module.exports = class MangaFoxCapabilitiesOperation extends AbstractCapabilitiesOperation {
    getCapabilities() {
        return new Capabilities()
            .setSearchableFields([Fields.TITLE, Fields.ARTIST, Fields.AUTHOR])
            .setTagOptions([
                'Action',
                'Adult',
                'Adventure',
                'Comedy',
                'Doujinshi',
                'Drama',
                'Ecchi',
                'Fantasy',
                'Gender Bender',
                'Harem',
                'Historical',
                'Horror',
                'Josei',
                'Martial Arts',
                'Mature',
                'Mecha',
                'Mystery',
                'One Shot',
                'Psychological',
                'Romance',
                'School Life',
                'Sci-fi',
                'Seinen',
                'Shoujo',
                'Shoujo Ai',
                'Shounen',
                'Shounen Ai',
                'Slice of Life',
                'Smut',
                'Sports',
                'Supernatural',
                'Tragedy',
                'Webtoons',
                'Yaoi',
                'Yuri',
            ])
            .setFilterByIncludingTags(true)
            .setFilterByExcludingTags(true);
    }

    supportsSearching() {
        return true;
    }
};
