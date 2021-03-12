const moment = require('moment');

module.exports = class Logs extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            tags: ['staff-3'],
            hidden: true
        })
    }

    async run({ message, args }) {
        let lines = +args[0] || 50,
            path = args[1] || moment().format('YYYY/MM/DD'),
            logs = terminal.read({ path, lines });

        return message.send({ message, title: `${path} Logs`, description: `Date: ${moment().format('YYYY/MM/DD')} Time: ${moment().format('HH:mm:ss')}` + '```css\n' + logs.slice(logs.length - 1000, logs.length) + '```' })
    }
}
