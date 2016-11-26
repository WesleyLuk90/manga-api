beforeEach(() => {
    jasmine.addMatchers({
        toBeInstanceOf() {
            return {
                compare(actual, expected) {
                    if (actual == null) {
                        return {
                            pass: false,
                            message: `Expected actual to not be null but got ${actual} instead`,
                        };
                    }
                    if (typeof actual !== 'object') {
                        return {
                            pass: false,
                            message: `Expected actual to be an object but got ${actual} instead`,
                        };
                    }
                    if (typeof expected !== 'function') {
                        return {
                            pass: false,
                            message: `Expected expected to be a function but got ${expected} instead`,
                        };
                    }
                    const result = {
                        pass: actual instanceof expected,
                    };
                    const not = result.pass ? ' not' : '';
                    result.message = `Expected ${actual.constructor.name}${not} to be an instance of ${expected.name}`;
                    return result;
                },
            };
        },
    });
});
