module.exports = class GuildDelete extends client.eventManager.Event {
    constructor() {
        super(__filename.split('/').pop().slice(0, -3));
    }

    async handle(guild) {
        let server = database.get(guild.id, 'guild');
        if (server.partnership.partneredAt) {
            let data = Object.merge(server, { partnership: { index: 0, partneredAt: undefined, requestedAt: undefined } }),
                channel = client.channels.cache.get(client.constants.ids.channels.partnerships),
                message = channel.messages.fetch(server.partnership.ids.message);
            database.guilds.set(server.id, data);
            if (message) message.delete();
        }
    }
}
