module.exports = class Reload extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            description: 'Reload bots commands and events, instantly and remotely.',
            category: module.filename.split('/').slice(-2)[0],
            aliases: ['rl'],
            tags: ['staff-3'],
            hidden: true
        })
    }

    async run({ message, args, user }) {
        let { commands, events, locales } = client.reload();

        return message.send(`Reloaded ${commands} commands, ${events} events, and constants.`);
    }
}
