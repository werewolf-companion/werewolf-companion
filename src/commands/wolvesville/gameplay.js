const fetch = require('node-fetch');

module.exports = class Gameplay extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            aliases: []
        })
    }

    async run({ message, args, user }) {
        return message.send('**COMING SOON**, join the Wolvesville Companion Discord server to submit your own gameplay screenshots.')

        /**
         * fetch(client.constants.links.companion.api + '/gameplay')
            .then(res => res.json())
            .then(body => {
                if (body.data) message.send(body.data.url);
                else message.send(body.error.message)
            })
         */
    }
}
