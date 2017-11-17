module.exports = {
    properties: {
        manga_tests: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    handle: {
                        type: 'string',
                    },
                    results: {
                        type: 'object',
                    },
                },
            },
            additionalProperties: false,
        },
        chapter_tests: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    handle: {
                        type: 'string',
                    },
                    results: {
                        type: 'object',
                    },
                },
            },
            additionalProperties: false,
        },
        page_tests: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    handle: {
                        type: 'string',
                    },
                    results: {
                        type: 'object',
                    },
                },
            },
            additionalProperties: false,
        },
        capabilities: {
            type: 'object',
            properties: {},
        },
        list_latest_tests: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    iterationCount: {
                        type: 'number',
                    },
                    hasChapters: {
                        type: 'boolean',
                    },
                    optionalChapters: {
                        type: 'boolean',
                    },
                    hasProperties: {
                        type: 'array',
                        items: {
                            type: 'string',
                        },
                    },
                    optionalProperties: {
                        type: 'array',
                        items: {
                            type: 'string',
                        },
                    },
                },
                additionalProperties: false,
            },
        },
    },
    additionalProperties: false,
};
