const ms = require('pretty-ms');

module.exports = class Uptime extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            aliases: ['u', 'up', 'ut']
        })
    }

    async run({ message, args, account }) {
        return message.send(`${message.emote('arrow_double_up')} **Client Uptime**: ${ms(client.uptime, { long: true })}`);
    }
}
