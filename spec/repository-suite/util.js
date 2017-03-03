exports.assertDataMatches = function assertDataMatches(actual, expected, exclude) {
    Object.keys(expected)
        .filter(c => !exclude || exclude.indexOf(c) === -1)
        .forEach((resultKey) => {
            if (expected[resultKey] instanceof RegExp) {
                expect(actual[resultKey])
                    .toMatch(expected[resultKey]);
            } else {
                expect(actual[resultKey])
                    .toEqual(expected[resultKey]);
            }
        });
};

exports.assertHandlesArray = function assertHandlesArray(actual, expected) {
    expect(Array.isArray(actual));
    expect(actual.map(c => c.getUrl()))
        .toEqual(expected);
};
