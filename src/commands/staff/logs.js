const moment = require('moment');

module.exports = class Logs extends client.commandManager.Command {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            tags: ['staff-4'],
            hidden: true
        })
    }

    async run({ message, args, guild, user }) {
        return message.send({ message, title: `Logs`, description: `Date: ${moment().format('YYYY/MM/DD')} Time: ${moment().format('HH:MM:ss')}` + '```css\n' + terminal.read() + '```' });
    }
}
