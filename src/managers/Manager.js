const { resolve } = require('path');

module.exports = class Manager {
    constructor() {
        let directory = __dirname.split('src')[0];
        this.srcDirectory = resolve(directory, 'src');
    }
}

