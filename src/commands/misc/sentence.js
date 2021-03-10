const txtgen = require('txtgen');

module.exports = class Sentence extends client.commandManager.Command {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            cooldown: 6000
        })
    }

    async run({ message }) {
        return message.send(txtgen.sentence());
    }
}