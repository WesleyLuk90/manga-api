const AbstractSearchOperation = require('../../sdk/operations/AbstractSearchOperation');

describe('AbstractSearchOperation', () => {
    it('should have methods', () => {
        const operation = new AbstractSearchOperation();
        expect(() => operation.search()).toThrowError(/Not Implemented/);
    });
});
