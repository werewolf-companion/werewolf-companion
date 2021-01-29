const { promisify, inspect } = require('util'),
    exec = promisify(require('child_process').exec);

module.exports = class Restart extends client.commandManager.Command {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            description: 'Completely restart the bot, instantly and remotely.',
            category: module.filename.split('/').slice(-2)[0],
            aliases: ['rs'],
            tags: ['staff-4'],
            hidden: true
        })
    }

    async run({ message, args, user }) {
        return message.send('Werewolf Companion has successfully been restarted.').then(msg => exec(`pm2 restart ${process.env.PM_ID}`));
    }
}
