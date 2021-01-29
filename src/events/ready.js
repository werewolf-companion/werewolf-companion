const STATUSES = [
    { type: 'PLAYING', names: ['Werewolf Online']},
    { type: 'WATCHING', names: ['the chat for @Werewolf Companion help']},
    { type: 'COMPETING', names: ['Werewolf Online']},
    { type: 'LISTENING', names: ['the Werewolf Online soundtrack']}
]

module.exports = class Ready extends client.eventManager.Event {
    constructor() {
        super(__filename.split('/').pop().slice(0, -3));
    }

    async handle() {
        //client.user.setPresence({ activity: { name: 'Undergoing maintenance', type: 'WATCHING' }, status: 'idle' }); // maintenance

        setInterval(function () {
            let statuses = STATUSES[Math.floor(Math.random() * STATUSES.length)],
                status = statuses.names[Math.floor(Math.random() * statuses.names.length)];
            client.user.setPresence({ activity: { name: status, type: statuses.type }, status: 'online' });
        }, 10000)
    }
}
