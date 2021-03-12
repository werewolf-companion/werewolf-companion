const STATUS_TYPES = [
    { type: 'PLAYING', names: ['Wolvesville'] },
    { type: 'WATCHING', names: ['the chat for @Wolvesville Companion help'] },
    { type: 'COMPETING', names: ['Wolvesville'] },
    { type: 'LISTENING', names: ['the Wolvesville soundtrack'] }
]

module.exports = class Ready extends client.events.class {
    constructor() {
        super(__filename.split('/').pop().slice(0, -3));
    }

    async handle() {
        if (client.maintenance) {
            client.user.setActivity('the undergoing maintenance', { type: 'WATCHING' });
            client.user.setStatus('dnd');
        } else {
            setInterval(function () {
                let statuses = STATUS_TYPES[Math.floor(Math.random() * STATUS_TYPES.length)],
                    status = statuses.names[Math.floor(Math.random() * statuses.names.length)];
                client.user.setActivity(status, { type: status.type });
                //client.user.setStatus('online');
            }, 10000)
        }
    }
}
