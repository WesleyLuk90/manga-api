exports.assertDataMatches = function assertDataMatches(actual, expected, exclude) {
    Object.keys(expected)
        .filter(c => !exclude || exclude.indexOf(c) === -1)
        .forEach((resultKey) => {
            if (expected[resultKey] instanceof RegExp) {
                expect(actual[resultKey])
                    .toMatch(expected[resultKey]);
            } else if (expected[resultKey] instanceof Function) {
                expected[resultKey](actual[resultKey]);
            } else {
                expect(actual[resultKey])
                    .toEqual(expected[resultKey]);
            }
        });
};

exports.assertHandlesArray = function assertHandlesArray(actual, expected) {
    expect(Array.isArray(actual));
    if (Array.isArray(expected)) {
        expect(actual.map(c => c.getUrl()))
            .toEqual(expected);
    } else if (typeof expected === 'object') {
        Object.keys(expected)
            .forEach((index) => {
                expect(index).toMatch(/[0-9]+/);
                expect(actual[parseInt(index, 10)].getUrl()).toBe(expected[index]);
            });
    } else {
        throw new Error(`Expected ${expected} to be an object or array`);
    }
};
