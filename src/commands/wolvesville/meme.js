const fetch = require('node-fetch');

module.exports = class Meme extends client.commandManager.Command {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            aliases: []
        })
    }

    async run({ message, args, user }) {
        fetch(client.constants.links.companion.api + '/meme')
            .then(res => res.json())
            .then(body => {
                if (body.data) message.send(body.data.url);
                else message.send(body.error.message)
            })
    }
}
