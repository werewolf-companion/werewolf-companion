const fetch = require('node-fetch');

module.exports = class Meme extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            description: 'Generate a random Wolvesville meme.',
            category: module.filename.split('/').slice(-2)[0]
        })
    }

    async run({ message, args, user }) {
        return fetch(client.constants.links.companion.api + '/meme')
            .then(res => res.json())
            .then(body => {
                if (body.data) return message.send(body.data.url);
                else return message.send(body.error.message)
            })
    }
}
