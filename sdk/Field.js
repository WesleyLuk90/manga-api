class Field {
    static create(label) {
        return new Field(label);
    }

    constructor(label) {
        if (typeof label !== 'string') {
            throw new Error('Label must be a string');
        }
        this.label = label;
    }
}

module.exports = Field;
