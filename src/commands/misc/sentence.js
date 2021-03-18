const txtgen = require('txtgen');

module.exports = class Sentence extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            description: 'Generate a random sentence.',
            category: module.filename.split('/').slice(-2)[0],
            cooldown: '5s',
        })
    }

    async run({ message }) {
        return message.send(txtgen.sentence());
    }
}